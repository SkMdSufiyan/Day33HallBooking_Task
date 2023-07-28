# Day33HallBooking_Task

For testing this app in POSTMAN   
The urls and the json body (for POST call) are given below.   
     
--------------------------For task-1 (creating a room)   
Url is "https://day33hallbookingtask.onrender.com/api/createRoom"     
And the body is:    
{
    "roomName" : "roomName-8",
    "numberOfSeats" : 2,
    "pricePerHour" : 3000,
    "amenities" : ["Furniture", "Sofa", "AC"]
}    
    
-------------------------For task-2 (booking a room)    
Url is "https://day33hallbookingtask.onrender.com/api/bookRoom"    
And the body is     
{
    "customerName" : "customerName-2",
    "roomName" : "roomName-6",
    "stayHours" : 8
}   


----------------------------For task-3 (list all rooms with booked data)    
Url is "https://day33hallbookingtask.onrender.com/api/allBookedRoomsData"    

 
----------------------------For task-4 (list all customers with booked data)     
Url is "https://day33hallbookingtask.onrender.com/api/customersBookedData"      

-----------------------------For task-5 (list how many times the customer has booked the room with necessary data)    
Url is "https://day33hallbookingtask.onrender.com/api/howManyTimesCustomerBooked"   




