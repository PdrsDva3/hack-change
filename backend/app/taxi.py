
MAX = 12

class Taxi:
    def __init__(self, position, lat, lon, capacity):
        self.position_dot = position
        self.lat = lat
        self.lon = lon
        self.capacity = capacity
        self.passengers = []
        self.route = {}


    def add_passengers(self, passengers, count):
        for i in range(count):
            self.passengers.append(passengers)

    def remove_passengers(self, position):
        self.passengers = [pas for pas in self.passengers if pas != position]

    def calculate_priorities(self):
        priorities = []
        for from_point, requests in self.route.items():
            for to_point, count in requests:
                if count > 0:
                    # Приоритет учитывает количество ожидающих и удаленность
                    priority = count / (1 + abs(to_point - from_point))  # Ближе — выше приоритет
                    priorities.append((from_point, to_point, count, priority))
        return sorted(priorities, key=lambda x: x[3], reverse=True)

    def assign_routes(self, demain):
        remaining_capacity = self.capacity - len(self.passengers)
        current_position = self.position
        route = []
        if remaining_capacity > 0:
            for from_point, to_point, count, priority in self.calculate_priorities():
                if from_point == current_position and remaining_capacity > 0:
                    # Забираем пассажиров
                    taken = min(count, remaining_capacity)
                    remaining_capacity -= taken
                    route.append((to_point, taken))
                    # Обновляем спрос
                    demain[from_point] = [
                        [p, c - taken] if p == to_point else [p, c]
                        for p, c in demain[from_point]
                    ]
        self.route = route

    def follow_route(self):
        new_passengers = []
        self.passengers = [el for el in self.passengers if el != self.position]
        for to_point, count in self.route:
            # Добавляем пассажиров в такси
            new_passengers.extend([to_point] * count)
            # Высадка пассажиров, которые прибыли
            self.passengers = [p for p in self.passengers if p != to_point]
            # Перемещение такси
        self.passengers.extend(new_passengers)

        if len(self.passengers) == 0:
            self.position += 1
            if self.position > MAX:
                self.position = 1
        else:
            self.position = sorted(self.passengers, key=lambda x: min(abs(x - self.position), abs(MAX - x + self.position)), reverse=False)[0]
