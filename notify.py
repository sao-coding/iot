import requests

url = 'https://notify-api.line.me/api/notify'
token = 'HPn9MAxwqAbV7DS88xiQB038gEFapZU8GUUdMMJkzeG'
headers = {
    'Authorization': 'Bearer ' + token
}
data = {
    'message': '\n2023年10月02日\n步數: 10000步\n睡眠: 8小時\n心率: 80\n體重: 60kg\n體脂: 20%',
    # 'stickerPackageId': '446',
    # 'stickerId': '1989'
}
data = requests.post(url, headers=headers, data=data)
