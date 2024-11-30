
import psycopg2
from psycopg2 import sql
from uvicorn import logging

import config

db_config = {
    'dbname': config.DB_NAME,
    'user': config.DB_USER,
    'password': config.DB_PASSWORD,
    'host': config.DB_HOST,
    'port': config.DB_PORT,
}


def db_connection():
    return psycopg2.connect(**db_config)


async def get_tax(from_id, tax_id):
    connection = db_connection()
    cursor = connection.cursor()
    out = dict()

    try:
        query = sql.SQL("""
        SELECT count(*) FROM orders WHERE from_id = %s
        """)
        cursor.execute(query, (from_id,))

        row = cursor.fetchone()
        out['prich'] = int(row[0])

        query = sql.SQL("""
        SELECT name, max_h FROM tax WHERE id = %s
        """)
        cursor.execute(query, (tax_id,))

        row = cursor.fetchone()
        out['name'] = int(row[0])
        out['max_h'] = int(row[1])

        return out

    except (Exception, psycopg2.DatabaseError) as error:
        pass
    finally:
        if connection:
            cursor.close()
            connection.close()


def get_orders_from(from_id):
    connection = db_connection()
    cursor = connection.cursor()
    try:
        query = sql.SQL("""SELECT count(*) FROM orders where from_id = &1;
        """)
        cursor.execute(query, (from_id,))
        row = cursor.fetchone()

        return row

    except (Exception, psycopg2.DatabaseError) as error:
        pass
    finally:
        if connection:
            cursor.close()
            connection.close()


def get_all_orders():
    connection = db_connection()
    cursor = connection.cursor()
    out = dict()
    try:
        query = sql.SQL("""SELECT id, from_id, in_id, ts FROM orders order by id;
        """)
        cursor.execute(query, )

        rows = cursor.fetchall()
        orders = [{"id": row[0], "from_id": row[1], "in_id": row[2], "ts": row[3]}
                  for row in rows]

        out['orders'] = orders

        return out

    except (Exception, psycopg2.DatabaseError) as error:
        pass
    finally:
        if connection:
            cursor.close()
            connection.close()



def delete_order(order_id):
    connection = db_connection()
    cursor = connection.cursor()
    try:
        query = sql.SQL("DELETE FROM orders WHERE id = %s")
        cursor.execute(query, (order_id,))

        if cursor.rowcount == 0:
            raise ValueError(f"Order with id {order_id} does not exist")

        connection.commit()
        return True

    except (Exception, psycopg2.DatabaseError) as error:
        print(f"Ошибка при удалении заказа: {error}")
        return False

    finally:
        if connection:
            cursor.close()
            connection.close()


async def add_route(filepath):
    pass

async def get_all_dots():
    connection = db_connection()
    cursor = connection.cursor()
    out = dict()

    try:
        query = sql.SQL("""
        SELECT id, address, lat, lon, name FROM dots; 
        """)
        cursor.execute(query, )

        rows = cursor.fetchall()
        dots = []
        for row in rows:

            dot = {"id": row[0], "address": row[1], "lat": row[2], "lon": row[3], "name": row[4]}
            dots.append(dot)
        out['dots'] = dots
        return out

    except (Exception, psycopg2.DatabaseError) as error:
        pass
    finally:
        if connection:
            cursor.close()
            connection.close()

async def create_meme(file_name, meme):
    connection = db_connection()
    cursor = connection.cursor()


    try:
        query = sql.SQL("""
            INSERT into memes (name, meme) VALUES (%s, %s); 
            """)
        cursor.execute(query, (file_name, meme, ))
        connection.commit()

    except (Exception, psycopg2.DatabaseError) as error:
        pass
    finally:
        if connection:
            cursor.close()
            connection.close()

async def get_all_memes():
    connection = db_connection()
    cursor = connection.cursor()

    try:
        query = sql.SQL("""
        SELECT id, name, meme FROM memes; 
        """)
        cursor.execute(query, )

        rows = cursor.fetchall()
        memes = [{"id": row[0], "name": row[1], "meme": row[2]}
            for row in rows]

        return memes

    except (Exception, psycopg2.DatabaseError) as error:
        pass
    finally:
        if connection:
            cursor.close()
            connection.close()
