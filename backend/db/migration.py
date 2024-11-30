"""
Миграции
"""
import psycopg2
from psycopg2 import sql

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


def migration_up():
    conn = db_connection()
    cur = conn.cursor()
    try:
        create = sql.SQL("""CREATE TABLE IF NOT EXISTS dots
(
    id     serial not null primary key,
    name varchar,
    address varchar,
    lat    varchar,
    lon    varchar
);

CREATE TABLE IF NOT EXISTS tax
(
    id serial not null primary key,
    name varchar,
    max_h int
);

CREATE TABLE IF NOT EXISTS orders
(
    id serial not null primary key,
    from_id int, 
    in_id int,
    ts timestamp
);

CREATE TABLE IF NOT EXISTS memes
(
    id serial not null primary key,
    name varchar,
    meme varchar
);

Create table if not exists lines(
    id serial not null primary key,
    file_name varchar,
    coord jsonb
);
        
""")

        cur.execute(create)  # Выполняем запрос на создание таблицы
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        return error
    finally:
        if conn:
            cur.close()
            conn.close()


def migration_down():
    conn = db_connection()
    cur = conn.cursor()
    try:
        drop = sql.SQL("""DROP TABLE IF EXISTS points, information_point, report, garbage;""")

        cur.execute(drop)  # Выполняем запрос на создание таблицы
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        return error
    finally:
        if conn:
            cur.close()
            conn.close()


if __name__ == "__main__":
    # migration_down()
    migration_up()
