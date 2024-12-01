from db.db import create_meme

import os
import base64


def encode_images_to_base64(directory_path: str):
    encoded_images = {}

    # Перебираем все файлы в папке
    for filename in os.listdir(directory_path):
        file_path = os.path.join(directory_path, filename)

        # Проверяем, что это файл, а не папка
        if os.path.isfile(file_path):
            try:
                # Открываем файл и читаем его содержимое
                with open(file_path, "rb") as image_file:
                    # Кодируем содержимое в base64
                    encoded_data = base64.b64encode(image_file.read()).decode("utf-8")

                    # Сохраняем в словарь (или любую другую структуру)
                    encoded_images[filename] = encoded_data
            except Exception as e:
                print(f"Ошибка обработки файла {filename}: {e}")

    return encoded_images


# Пример использования
directory = "./uploaded_files"  # Укажите путь к папке с изображениями
encoded_images = encode_images_to_base64(directory)

# Печать первого закодированного изображения

for filename, encoded_data in encoded_images.items():
   create_meme(filename, encoded_data)  # Печать первых 100 символов
