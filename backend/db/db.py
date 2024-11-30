
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
