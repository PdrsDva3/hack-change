import route_optimizer
from db.db import get_tax, get_all_orders, get_orders_from


def data(first, second):
    orders = int(get_orders_from(first)/40 *100)
    ci = 1
    var = route_optimizer.taxist[:]
    sorted(var, key=lambda x: x["position"], reverse=True)
    for i in range(len(var)):
        if var[i]["position"] >= first:
            ci = i - 1
    if ci == 0:
        out = int(len(var[-1]["passengers"])/var[-1]["capacity"]*100)
        ci = len(var)-1
    else:
        out = int(len(var[ci]["passengers"])/var[ci]["capacity"]*100)
    tax = 1
    for i in range(len(var)):
        if app.route_optimizer.taxis[i] == var[ci]:
            tax = i
            break

    time_1 = 6
    time_2 = 6
    price = 120

    return orders, time_1, time_2, price, out, tax

