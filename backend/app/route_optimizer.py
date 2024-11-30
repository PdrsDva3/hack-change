import pprint
import random
import time

MAX = 12

# Инициализация данных
from collections import defaultdict

# Запросы: каждая точка содержит список [куда, количество]
demand = {1: [[2, 3], [3, 4], [4, 2], [5, 3], [6, 5], [7, 3], [8, 2], [9, 4], [10, 2], [11, 1], [12, 5]],
          2: [[3, 3], [4, 1], [5, 1], [6, 2], [7, 3], [8, 1], [9, 4], [10, 5], [11, 1], [12, 4]],
          3: [[4, 4], [5, 5], [6, 1], [7, 1], [8, 3], [9, 3], [10, 5], [11, 1], [12, 2]],
          4: [[5, 4], [6, 1], [7, 2], [8, 3], [9, 1], [10, 5], [11, 1], [12, 4]],
          5: [[6, 4], [7, 1], [8, 2], [9, 3], [10, 3], [11, 1], [12, 5]],
          6: [[7, 2], [8, 3], [9, 5], [10, 4], [11, 2], [12, 1]],
          7: [[8, 4], [9, 2], [10, 2], [11, 5], [12, 1]],
          8: [[9, 1], [10, 4], [11, 3], [12, 3]],
          9: [[10, 5], [11, 5], [12, 2]],
          10: [[11, 5], [12, 3]],
          11: [[12, 3]]}

taxis = [{'position': i, 'capacity': 10, 'passengers': []} for i in range(1, MAX, 2)]  # 5 такси

# Функция расчета приоритетов


def calculate_priorities():
    priorities = []
    for from_point, requests in demand.items():
        for to_point, count in requests:
            if count > 0:
                # Приоритет учитывает количество ожидающих и удаленность
                priority = count / (1 + abs(to_point - from_point))  # Ближе — выше приоритет
                priorities.append((from_point, to_point, count, priority))
    return sorted(priorities, key=lambda x: x[3], reverse=True)


# Распределение маршрутов для такси
def assign_routes():
    for taxi in taxis:
        remaining_capacity = taxi['capacity'] - len(taxi['passengers'])
        current_position = taxi['position']
        route = []
        if remaining_capacity > 0:
            for from_point, to_point, count, priority in calculate_priorities():
                if from_point == current_position and remaining_capacity > 0:
                    # Забираем пассажиров
                    taken = min(count, remaining_capacity)
                    remaining_capacity -= taken
                    route.append((to_point, taken))
                    # Обновляем спрос
                    demand[from_point] = [
                        [p, c - taken] if p == to_point else [p, c]
                        for p, c in demand[from_point]
                    ]
        taxi['route'] = route


# Функция выполнения маршрута
def follow_route(taxi):
    new_passengers = []
    taxi['passengers'] = [el for el in taxi['passengers'] if el != taxi["position"]]
    for to_point, count in taxi['route']:
        # Добавляем пассажиров в такси
        new_passengers.extend([to_point] * count)
        # Высадка пассажиров, которые прибыли
        taxi['passengers'] = [p for p in taxi['passengers'] if p != to_point]
        # Перемещение такси
    taxi['passengers'].extend(new_passengers)

    if len(taxi['passengers']) == 0:
        taxi['position'] += 1
        if taxi['position'] > MAX:
            taxi['position'] = 1
    else:
        taxi['position'] = sorted(taxi['passengers'], key=lambda x: min(abs(x - taxi['position']), abs(12 - x + taxi['position'])), reverse=False)[0]

# Основной цикл
def add_new_passageres():
    for i in range(MAX-1):
        for j in range(MAX):
            if i < j and random.randint(0, 3) == 1:
                demand[i + 1].append([j + 1, random.randint(1, 5)])


while True:
    assign_routes()  # Планируем маршруты
    print(taxis)
    for taxi in taxis:
        follow_route(taxi)  # Выполняем маршруты
    add_new_passageres()
    time.sleep(3)  # Повторяем каждые 10 секунд
