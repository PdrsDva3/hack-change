import xml.etree.ElementTree as ET


def coord(file_path):
    tree = ET.parse(file_path)
    root = tree.getroot()

    # Извлекаем имя из элемента <name>
    # Так как используется пространство имен, нам нужно указать его
    namespace = {'kml': 'http://www.opengis.net/kml/2.2'}
    name_element = root.find('.//kml:Placemark/kml:LineString/kml:coordinates', namespace)

    # Печатаем значение тега <name>
    if name_element is not None:
        return [[elem.split(',')[1], elem.split(',')[0]]for elem in ["".join(elem.split(",0")) for elem in name_element.text.split()]]
    else:
        return []