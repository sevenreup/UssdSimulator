# USSD Emulator

This is a simple utility for testing USSD applications.

PS. 😅😅 Did not want to use postman for testing the ussd.

## USSD Response and Requests

Request
```json
{
  "Msisdn": "26588888888",
  "SessionId": "674287823",
  "Message": "Test message",
  "SessionType": "1"
}
```

Response
```json
{
    "Response": "Welcome menu",
    "SessionType": "2"
}
```

## Usage

- Pull and run `yarn install`
- Input the USSD url
- Navigate through the USSD menus
## Todo
- [ ] Add simulated timeout
- [ ] should be able to acommodate other ussd response and request formats
## Possible features

- Automated tests
  - Should create tests for automating different flows and generate reports
- Generate screenshorts of the menus
