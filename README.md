# EduFi - Marks exchange

Backend source code for the EduFi marks exchange package.

## Disclaimer
> EduFi is in no way a registered trademark or an official application. It is an academic project to simulate microservices. Author bears no responsibility for any injuries caused, cats killed in the using of any portion the app.

## Architecture & Design considerations
![image](https://user-images.githubusercontent.com/93184095/150818159-a0488dfe-cf14-42ba-a72d-abfc0b5e4089.png)

### Ports in use
| Host Port | Internal container port | Reserved by |
| ---- | ---- |
| 9160 | 9160 | Frontend |
| 9161 | 3306 | MySQL server |
| 9162 | 80 | PHPMyAdmin |
| 9163 | 6379 | Redis server |
| 9164 | 9164 | Tokens service |
| 9165 | 9165 | Trades service |
| 9166 | 9166 | Marks service |

## Setting up

