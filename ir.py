import requests
import json
devices_list = requests.get('http://sao-x.com:3000/api/devices-list').json()

devices_list_format = []
for i in devices_list:
    devices_list_format.append(i['name'])
if '大金冷氣' in devices_list_format:
    print('yes')
for i in devices_list:
    print(i['device'])
    print(i['name'])
text = input()
value = {}
ans = '好的，'
for device in devices_list:
    if device['name'] in text:
        if device['device'] in "aircon":
            value['devices'] = 'aircon'
            ans += '冷氣幫你設定'
            if '開' in text and ('擺動' in text or '搖擺' in text):
                value['swing_on'] = 'true'
                ans += '開搖擺'
            elif '關' in text and ('擺動' in text or '搖擺' in text):
                value['swing_off'] = 'true'
                ans += '關搖擺'
            elif '風量' in text and '大' in text:
                value['fan_high'] = 'true'
                ans += '風量大'
            elif '風量' in text and '小' in text:
                value['fan_low'] = 'true'
                ans += '風量小'
            elif '開' in text and '冷氣' in text:
                value['on'] = 'true'
                ans += '開啟'
            elif '關' in text and '冷氣' in text:
                value['off'] = 'true'
                ans += '關閉'
            elif '度' in text:
                value['temp'] = text[-3:-1]
                ans += text[-3:]
    #         {
    #   "devices": "fan",
    #   "name": "電風扇",
    #   "signal": "L-fan"
    # }
    #       {
    #     name: '電風扇',
    #     protocols: 'SYMPHONY',
    #     bits: 0,
    #     on: '0xDC3',
    #     off: '0xDC3',
    #     'L-fan': '0xD88',
    #     'H-fan': '0xD90',
    #     'H-swing': '0xD81',
    #     'V-swing': '0xD82',
    #     logtime: 2023-08-02T16:04:23.000Z
    #   }
        if device['device'] in "fan":
            value['devices'] = 'fan'
            value['name'] = '電風扇'
            ans += '電風扇幫你設定'
            if '開' in text and '弱風量' in text:
                value['signal'] = 'L-fan'
                ans += '弱風量'
            elif '開' in text and '強風量' in text:
                value['signal'] = 'H-fan'
                ans += '強風量'
            elif '開' in text and '左右擺動' in text:
                value['signal'] = 'H-swing'
                ans += '左右擺動'
            elif '開' in text and '上下擺動' in text:
                value['signal'] = 'V-swing'
                ans += '上下擺動'
            elif '開' in text and '風扇' in text:
                value['signal'] = 'on'
                ans += '開啟'
            elif '關' in text and '風扇' in text:
                value['signal'] = 'off'
                ans += '關閉'
            ans += '電風扇幫你設定'

        if device['device'] in "tv":
            value['devices'] = 'tv'
            value['name'] = '電視'
            ans += '電視幫你設定'
            if '開' in text and '電視' in text:
                value['signal'] = 'on'
                ans += '開啟'
            elif '關' in text and '電視' in text:
                value['signal'] = 'off'
                ans += '關閉'
            # 轉台
            elif '轉' in text and '台' in text:
                value['signal'] = text[-3: -1]
                ans += text[-3:]
            elif '確定' in text:
                value['signal'] = 'ok'
                ans += '確定'
            ans += '電視幫你設定'

url = 'http://sao-x.com:3000/api/voice'
myobj = value
headers = {"Content-Type": "application/json"}
# x = requests.post(url, headers=headers, data=myobj)
x = requests.post(url, headers=headers, data=json.dumps(myobj))
print(value)
print(text)
print(ans)
