# PeaceGlobalAssign
BACKEND(Laravel):
Performed CRUD operations for a Cars Table that consists of three attributes Car: string, Model : text, Image: text 

1) create Models for the table with command: 
php artisan make:model products -mcr
2)Then Add table field schema car,model,Image to migrations and make them fillable model
3)Now migrate the model to database with a fresh seed by runing the command:
php artisan migrate: fresh --seed
4) Then Provide access for route in api.php file by importing controller
5) Now the main Part to define the controller to store,show,update and destroy

List Method: 
1) get the selected fields of model and return them

Store method :
1) Firstly validate the request by making all the fields required then call the public storage model and assign image with its name to that storage model
2)and Now make a create method for product model and pass the $request to post it to database

Update Method:
1)Firstly we get a fetch request for an object with id
2)then the object of that id will be updated and request object will be sent to Update method if the request object contains image then find the old image and delete that then update the new image and post it to the api

Delete Method:
1) We recieve an Id of the product find that particular product and destroy




FRONTEND(React,Next): 
Extensions used : 
React Bootstrap - A widely used OpenSource library for styling
Axios - A promise based HTTP client to send requests to the API
React-router-dom - To perform routing between components of the application.
sweetalert2 - for decorative alerts that display With Customizeable Messages
react-image-crop - to crop images while uploading

Commands to run after Cloning:
npm install axios react-bootstrap bootstrap 
npm install react-router-dom sweetalert2 --save
npm install react-image-crop@9.1.1





