# test-jenosize

Deploy ลง Heroku url https://still-beach-77333.herokuapp.com/

# ข้อ Place search|Place  
ตัวอย่าง Input Body (เป็น number ทั้งหมด)


    "latitude" : 7.1951347,
    "longitude" : 100.5871561,
    "radius" : 1200


api url : GET  https://still-beach-77333.herokuapp.com/findRestaurant

# ข้อ Game 24  
ตัวอย่าง Input Body (เป็น array of number 4 ตัวเท่านั้น)


    "numbers" : [4,2,3,1]


api url : POST  https://still-beach-77333.herokuapp.com/twentyfourGame

# ข้อ ระบบ login 
Login แล้วจะโชว์ Email และ Name

Email : testjenosize1@gmail.com

Password : 12345678

api  url : GET https://still-beach-77333.herokuapp.com/loginweb

# ข้อ Game XO
ตัวอย่าง Input Body  (เป็น array of object sign มีค่าเป็น X หรือ O, position เป็น string 1-9 ซ้ำไม่ได้)


    "xoArray" : [
        {
            "sign" : "X",
            "position" : "1"
        },
        {
            "sign" : "O",
            "position" : "2"
        },
        {
            "sign" : "X",
            "position" : "4"
        },
        {
            "sign" : "O",
            "position" : "5"
        },
        {
            "sign" : "X",
            "position" : "9"
        }
    ]


api url : POST  https://still-beach-77333.herokuapp.com/xoGame
