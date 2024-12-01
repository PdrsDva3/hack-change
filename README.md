# Проект: hack_change

<div align="center">
    <img src="https://img.shields.io/badge/typescript-323330?style=for-the-badge&logo=typescript&logoColor=blue"/>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue"/>
    <img src="https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white"/>
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
    <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white"/>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
    <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"/>
    <img src="https://img.shields.io/badge/2GIS-323330?style=for-the-badge"/>
</div>

## Описание
Данный проект представляет собой сервис заказов речного шеринг-такси, разработанный Правительством Москвы.

Фронтенд приложения представляет собой интерактивную карту, на которой пользователи могут видеть расположение речного транспорта, строить маршруты от точки А до точки Б и заказывать транспорт для поездки. Пользователи также могут видеть информацию о стоимости поездки и о времени прибытия с учетом загруженности.

Бекенд приложения отвечает за аналитику нахождения самого оптимального и времезатратного маршрута, а также за рассчет загруженности судов и цены поездки. Для этого в проекте используются данные от картографической компании 2ГИС, которые помогают определить маршруты, учитывая дорожную обстановку и прочие факторы.

В итоге, данный проект позволяет пользователям легко и удобно заказывать речной транспорт, оптимизируя свои поездки по городу и экономя время и усилия.


Модель прогнозирует время поездки на основе времени подхода и отхода судна. Это важно для планирования и управления движением водного такси, так как помогает точно предсказывать, сколько времени займет каждая поездка и оптимизировать использование ресурсов (например, причалов и судов).

Ссылка на репозиторий с ML-дополнением (смотреть README.md)
https://github.com/Clever0wl/hack-change-ml



## Скринкаст прототипа приложения
Доступен по ссылке
https://drive.google.com/drive/folders/1G6_HuWNhtTPU91xwarePdzcUdm1dI0w0?usp=sharing

Ссылка на фигму
https://www.figma.com/design/axxKrpeOWgUMBunE9Rve3v/change%26hack?node-id=0-1&t=GBb4iTgoEgwgcXsT-1


## Технологический стек

**Frontend**:  
- React  
- TypeScript  
- JavaScript  
- HTML  
- CSS  

**Backend**:  
- Python  
- FastAPI  


**ML**:
- Python


**База данных**:  
- Docker
- PostgreSQL  


### Структура проекта
Основные файлы
```
.
├── backend        # Серверная часть (FastAPI)
│   ├── main.py    # Точка входа для backend
│   └── requirements.txt  # Зависимости backend
├── frontend       # Клиентская часть (React + TS)
│   ├── package.json # Зависимости frontend
│   └── src         # Исходный код фронтенда

```
## Установка и запуск

### 1. Клонирование репозитория
```bash
git clone https://github.com/your-repo-name.git
cd your-repo-name
```
### 2. Скачивание зависимостей
```bash
cd backend
pip install -r requirements.txt
cd ..
cd frontend
npm i
```

### 3. Запуск

```bash
cd backend
python main.py
cd ..
cd frontend
npm run dev
```

## Состав команды

1. Калинкин Денис

     Роль: Backend 
2. Виноградова Ангелина 

     Роль: Backend
3. Петрова Полина  

      Роль: Backend & Design
4. Долгополова София 

      Роль: Frontend & Design 
5. Липейко Богдан 

      Роль: ML
