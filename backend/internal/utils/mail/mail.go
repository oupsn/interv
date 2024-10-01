package mail

import (
	"strconv"
	"time"
)

func BuildInviteMail(name string, dueDate time.Time, roomId uint) string {
	thailandLocation, err := time.LoadLocation("Asia/Bangkok")
	if err != nil {
		thailandLocation = time.UTC
	}

	dueDateInThailand := dueDate.In(thailandLocation)

	return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Interview Invitation</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n        }\n\n        .container {\n            background-color: #f5f5f5;\n            padding: 40px 0 40px 0;\n            display: flex;\n        }\n\n        .card {\n            background-color: white;\n            border-radius: 15px;\n            padding: 0 20px 20px 20px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n            max-width: 600px;\n            text-align: center;\n            margin-left: auto;\n            margin-right: auto;\n        }\n\n        .header h1 {\n            font-size: 36px;\n            margin: 0;\n            font-weight: bold;\n        }\n\n        h1 {\n            color: #333;\n            font-size: 24px;\n            margin: 20px 0;\n        }\n\n        .image-container {\n            margin: 20px 0;\n        }\n\n        .image-container img {\n            width: 50%;\n            border-radius: 10px;\n        }\n\n        .description {\n            color: #555;\n            font-size: 18px;\n            margin-bottom: 20px;\n        }\n\n        .due-date {\n            font-size: 20px;\n            color: #333;\n            margin: 20px 0;\n        }\n\n        a {\n            text-decoration: none;\n            color: #ffffff;\n        }\n\n        .start-button {\n            background-color: #329B92;\n            color: white;\n            padding: 20px 60px;\n            border-radius: 5px;\n            cursor: pointer;\n            font-size: 20px;\n            text-decoration: none;\n            margin: 20px;\n        }\n\n        .start-button:hover {\n            background-color: #40b3a9;\n        }\n\n        .solid {\n            width: 50%;\n            border: 1px solid #329B92;\n            margin-top: 40px;\n            margin-bottom: 40px;\n        }\n    </style>\n</head>\n<body>\n<div class=\"container\">\n    <div class=\"card\">\n        <img src=\"https://qa.interv.cc/assets/interv-logo-B0rTANdX.png\" width=\"200px\">\n        <h1>You are invited to the interview!</h1>\n        <div class=\"image-container\">\n            <img src=\"https://media1.tenor.com/m/1IBMYwFj8gYAAAAC/happy-cat-excited-cat.gif\" alt=\"Meow\">\n        </div>\n\n        <h1>Hi " + name + "</h1>\n        <p class=\"description\">\n            We’ve received your CV, and we're excited to get to know you better! A CV gives us a snapshot of your\n            experience,\n            but we know there’s so much more to you. This interview is your chance to really shine and show us what\n            makes\n            you unique.\n        </p>\n        <p class=\"description\">\n            Ready to stand out? Just click the button below to start your interview!\n        </p>\n        <hr class=\"solid\">\n        <p class=\"due-date\"><strong>Due Date:</strong> " + dueDateInThailand.Format(time.RFC1123) + "</p>\n        <a href=\"interv.cc/room/" + strconv.FormatUint(uint64(roomId), 10) + "\" target=\"_blank\">\n            <div class=\"start-button\">\n                <strong>Start interview</strong>\n            </div>\n        </a>\n    </div>\n</div>\n\n</body>\n</html>\n"
}

func BuildFinishMail() string {
	return "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>Interview Invitation</title>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            margin: 0;\n            padding: 0;\n        }\n\n        .container {\n            background-color: #f5f5f5;\n            padding: 40px 0 40px 0;\n            display: flex;\n        }\n\n        .card {\n            background-color: white;\n            border-radius: 15px;\n            padding: 0 20px 20px 20px;\n            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n            max-width: 600px;\n            text-align: center;\n            margin-left: auto;\n            margin-right: auto;\n        }\n\n        .header h1 {\n            font-size: 36px;\n            margin: 0;\n            font-weight: bold;\n        }\n\n        h1 {\n            color: #333;\n            font-size: 24px;\n            margin: 20px 0;\n        }\n\n        .image-container {\n            margin: 20px 0;\n        }\n\n        .image-container img {\n            width: 50%;\n            border-radius: 10px;\n        }\n\n        .description {\n            color: #555;\n            font-size: 18px;\n            margin-bottom: 20px;\n        }\n    </style>\n</head>\n<body>\n<div class=\"container\">\n    <div class=\"card\">\n        <img src=\"https://qa.interv.cc/assets/interv-logo-B0rTANdX.png\" width=\"200px\">\n        <h1>Thank you for interview!</h1>\n        <div class=\"image-container\">\n            <img src=\"https://media1.tenor.com/m/ZhfMGWrmCTcAAAAC/cute-kitty-best-kitty.gif\" alt=\"Meow\">\n        </div>\n        <p class=\"description\">\n            Ba bye!\n        </p>\n    </div>\n</div>\n\n</body>\n</html>\n"
}
