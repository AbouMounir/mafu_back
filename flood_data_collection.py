import urllib3
import facebook
import requests
from bs4 import BeautifulSoup

token = "EAA1YOZAapPfkBO9laTCkeJAZCxHSdVP5ZA8UeYXpr54E4j1UN43gyulJjtZBXt3JiENBTP5hAZCFou3WqVPmiGg1oumqxZAfR5gJ4efQZCIZCCmIQSOFro6gjZANYwfgleZCPQsWJIUettpgzwB7wZCGIezsJEHFzaw4e7qFQyz3MVLN7TC3g58ZAjkKopkV"

#graph = facebook.GraphAPI(access_token = token, version = 3.1)

#events = graph.request('/search?q=School Guidance&type=event&limit=10')

#print(events['data'])

html = requests.get('https://www.facebook.com/profile.php?id=100057269596998')

soup = BeautifulSoup(html.text,'html.parser')

body = soup.find('img')

print(body)

{
    "floodScene": "INONDATION EN ABIDJAN RIMCO VGE  km23 autoroute du nord",
    "floodLocation": {
        "longitude": "5.4106",
        "latitude": "-4.1572"
    },
    "floodDate": "LE 14 JUIN 2024",
    "floodDescription": "LE CIEL GRONDE !",
    "floodIntensity": "",
    "floodImage": "images/km23.jpg"
}

{
    "floodScene": " Inondation à la palmeraie entre carrefour commissariat et le super marché chic shop de la palmeraie ",
    "floodLocation": { 
        "longitude": "5.3597",
        "latitude": "-3.9618"
    },
    "floodDate": "LE 13 JUIN 2024",
    "floodDescription": "",
    "floodIntensity": "Elevé",
    "floodImage": "images/inondation_palmeraie.jpg"
}

{
    "floodScene": "ANGRÉ STARS 9 B",
    "floodLocation": {
        "longitude": "5.4135",
        "latitude": "-3.9898"
    },
    "floodDate": "LE 14 JUIN 2024",
    "floodDescription": "LE CIEL GRONDE !",
    "floodIntensity": "Elevé",
    "floodImage": ""
}

{
    "floodScene": "la voie express Adjamé-Yopougon.",
    "floodLocation": {
        "longitude": "5.3590",
        "latitude": "-4.0581"
    }, 
    "floodDate": "LE 14 JUIN 2024",
    "floodDescription": "Alerte : Nous conseillons aux conducteurs de garer leur véhicule en attendant que la pluie diminue en intensité ou cesse. La circulation est interrompue sur la voie express Adjamé-Yopougon.",
    "floodIntensity": "Elevé",
    "floodImage": "images/voie_express_yop_adjame.jpg"
}

{
    "floodScene": "Adjame carrefour paillet",
    "floodLocation": {
        "longitude": "5.3715",
        "latitude": "-4.0121"
    }, 
    "floodDate": "LE 16 JUIN 2024",
    "floodDescription": "MONTÉES DES EAUX SONT SIGNALÉES",
    "floodIntensity": "",
    "floodImage": "images/carrefour_paillet_1.jpg"
}

{
    "floodScene": "ABOBO BAOULE extension zone secteur Gouro",
    "floodLocation": { 
        "longitude": "5.4259",
        "latitude": "-3.9898"
    }, 
    "floodDate": "LE 26 JUIN 2022",
    "floodDescription": "inondations , Véhicules à l’arrêt. Circulation impossible. Montée des eaux dans certains  domiciles.",
    "floodIntensity": "",
    "floodImage": "images/abobo_baoule.jpg"
}

{
    "floodScene": "PALMERAIE PROGRAMME 05",
    "floodLocation": {
        "longitude": "5.3955",
        "latitude": "-3.9677"
    }, 
    "floodDate": "LE 26 JUIN 2020",
    "floodDescription": "inondations de plusieurs maisons, évacuation de la population en cours",
    "floodIntensity": "",
    "floodImage": "images/palmeraie_programme5.jpg"
}

{
    "floodScene": "quartier de Cocody Angré résidence Émilie",
    "floodLocation": { 
        "longitude": "5.4149",
        "latitude": "-3.9875"
    }, 
    "floodDate": "LE 13 JUIN 2020",
    "floodDescription": "la zone était impraticable: Voies impraticables. Spectacle désolant de véhicules sous les eaux, des habitations totalement inondées.",
    "floodIntensity": "",
    "floodImage": "images/quartier de Cocody Angré résidence Émilie.jpg"
}

{
    "floodScene": "carrefour Indénié inondé",
    "floodLocation": {
        "longitude": "5.3411",
        "latitude": "-4.0181"
    }, 
    "floodDate": "Vendredi 11 mai 2018",
    "floodDescription": "des véhicules coincés dans les eaux",
    "floodIntensity": "",
    "floodImage": "images/carrefour indenie.jpg"
}