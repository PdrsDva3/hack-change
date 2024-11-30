import pprint
import random
import time

import db.db


MAX = 9
demand = dict()

# Инициализация данных
from collections import defaultdict


# Запросы: каждая точка содержит список [куда, количество]
def get_demand():
    orders = db.db.get_all_orders()['orders']
    for order in orders:
        if order['from_id'] == order['in_id']:
            continue
        if order['from_id'] not in demand:
            demand[order["from_id"]] = dict()
        if order["in_id"] not in demand[order["from_id"]]:
            demand[order["from_id"]][order["in_id"]] = []
        if order["id"] not in demand[order["from_id"]][order["in_id"]]:
            demand[order["from_id"]][order["in_id"]].append(order["id"])
    return demand


taxis = [{'position': i, 'capacity': 10, 'passengers': []} for i in range(1, MAX, 2)]  # 5 такси


# Функция расчета приоритетов


def calculate_priorities():
    priorities = []
    for from_point, requests in demand.items():
        for to_point, ids in requests.items():
            count = len(ids)
            if count > 0:
                # Приоритет учитывает количество ожидающих и удаленность
                priority = count / (1 + min(abs(to_point - from_point),
                                            abs(MAX - to_point + from_point)))  # Ближе — выше приоритет
                priorities.append((from_point, to_point, ids, priority))
    return sorted(priorities, key=lambda x: x[3], reverse=True)


# Распределение маршрутов для такси
def assign_routes(d):
    demand = d
    for taxi in taxis:
        remaining_capacity = taxi['capacity'] - len(taxi['passengers'])
        current_position = taxi['position']
        route = []
        if remaining_capacity > 0:
            for from_point, to_point, ids, priority in calculate_priorities():
                del_id = []
                if from_point == current_position and remaining_capacity > 0:
                    count = len(ids)
                    # Забираем пассажиров
                    taken = min(count, remaining_capacity)
                    for i in range(taken):
                        del_id.append(ids[i])
                    remaining_capacity -= taken
                    route.append((to_point, taken))
                for id in del_id:
                    db.db.delete_order(id)
                    demand[from_point][to_point].remove(id)
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
        taxi['position'] = \
        sorted(taxi['passengers'], key=lambda x: min(abs(x - taxi['position']), abs(12 - x + taxi['position'])),
               reverse=False)[0]



# Основной цикл
def add_new_passageres():
    for i in range(MAX - 1):
        for j in range(MAX):
            if i < j and random.randint(0, 3) == 1:
                demand[i + 1].append([j + 1, random.randint(1, 5)])


def data(first, second):
    orders = int(db.db.get_orders_from(first)[0] / 40 * 100)
    var = taxis[:]
    tax = len(var)

    for i in range(len(var)):
        if var[i]['position'] != first:
            if len(var[i]['passengers']) < var[i]['capacity']:
                if min(abs(first - var[i]['position']), abs(12 - first + var[i]['position'])) < 3:
                    tax = i
                    out = len(var[i]['passengers']) / var[i]['capacity'] * 100
                    print(len(var[i]['passengers']), var[i]['capacity'])
    if tax == len(var):
        out = 100
        tax -= 1

    time_1 = 6
    time_2 = 6
    price = 120

    return tax, time_1, time_2, price, orders, out



