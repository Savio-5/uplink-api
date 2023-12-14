import requests
import json

url = 'https://api.upstox.com/v2/order/place'

headers = {
    'Accept': 'application/json',
    'Api-Version': '2.0',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJrZXlfaWQiOiJza192MS4wIiwiYWxnIjoiSFMyNTYifQ.eyJzdWIiOiI3QkJDRjIiLCJqdGkiOiI2NTc2OGVkNmQ1N2UxYzFjMWM5OTcxOGYiLCJpc011bHRpQ2xpZW50IjpmYWxzZSwiaXNBY3RpdmUiOnRydWUsInNjb3BlIjpbImludGVyYWN0aXZlIiwiaGlzdG9yaWNhbCJdLCJpYXQiOjE3MDIyNjg2MzAsImlzcyI6InVkYXBpLWdhdGV3YXktc2VydmljZSIsImV4cCI6MTcwMjMzMjAwMH0.T6OYEPIy0IGzfILIb_ycPVYQrcrZzkFUawuUSQNc12I'
}

data = {
"quantity": 15,
"product": "I",
"validity": "DAY",
"price": 0,
"instrument_token": "NSE_FO|40807",
"order_type": "MARKET",
"transaction_type": "BUY",
"disclosed_quantity": 0,
"trigger_price": 0,
"is_amo": False
}


response = requests.request('POST', url, headers=headers, json=data)
json_formatted_str = json.dumps(response.json(), indent=2)

print(json_formatted_str)