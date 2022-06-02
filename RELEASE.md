# Tutorial
## Tutorial on how to build a temperature/humidity and gas sensor with DHT11, MQ35 and NodeMCU Esp8266

### Brief Description
- Title: Room-Air-Quality
- Student name: Thanh Tran and student credentials: tt222kj
- Short overview: It is an IoT project which uses DH11 and MQ135 sensor to evaluate the air quality and send the data
via Node MCU ESP8266 with Wi-Fi connection to FireBase real-time database. The data in Firebase is accessible via a REST API
and is shown in a bar chart in Vue client apps.
- Working Time: totalt approximately 50 hours (IoT thing, API, Client and deployment)

### Objective
I have an air purifier in my room and I want to check if the air quality becomes better if I have run it for a while. As a result,
I looked for sensor that can examine humidity/temperature and CO2, smoke level in the room then I found DHT11 and MQ135 sensor.
The data needs to send somewhere so I did choose Node MCU ESP8266 to connect with FireBase cloud via my wi-fi connection. This IoT will
help you to evaluate air quality wherever you are with an available wi-fi connection. The data is sent every 30 minutes to real-time database Firebase. This thing can be adapted in the room or in the office to check the air quality. 

### Material

List of material: 
+ 1 NodeMCU ESP8266 12F: send Data via Wi-fi (microcontroller)
+ bredboard: link between the sensor and the wire
+ Jumper Wires : connect the energy(battery) to sensor
+ 1 battery 9V : energy for IoT thing
+ battery connector: link battery to IoT thing
+ 1DHT11: sensor for humidity and temperature
+ 1MQ135: sensor for gas level
+ USB cable 2.0: connect the NodeMCU ESp8266 to the Arduino IDE for loading the code

| IoT thing         | Price | Where to buy                              |  
|-------------------|-------|-------------------------------------------|
| Node MCU ESP8266  | 90kr  | [Amazon](https://www.amazon.se/)          |  
| Sensor Package    | 300kr | [Elektrokit](https://www.electrokit.com/) |  
| MQ35              | 78kr  | [Amazon](https://www.amazon.se/)          |  
| Batteri 9V        | 25kr  | [Amazon](https://www.amazon.se/)          |   
| Batteri Connector | 25kr  | [Amazon](https://www.amazon.se/)          |   
| Bredboard package | 150kr | [Amazon](https://www.amazon.se/)          |   
| Totalt            | 668kr |                                           |   
|                   |       |                                           |  

![NodeMCU!](img/nodemcu.PNG)

![DHT11!](img/dht11.PNG)

![MQ135!](img/mq135.PNG)

### Computer setup

- IoT thing is programmed with C++ in Arduino IDE for Window and different libraries (DHT library, Adafruit library, Firebase library...). The Adafruit library is included in the folder thing. Other can be found in Arduino library.
- The code is uploaded via PORT(COM3) in Arduino with help of the USB cable 2.0 via a computer. The tool must be identified to NodeMCU ESP 8266 12F.
- To set up IoT, Arduino IDE must be installed and has access to the library. The wi-fi credentials needs to be provided by the user to connect to FireBase real-time database. 

How is the device programmed? Which IDE are you using? Describe all steps from flashing the firmware to installing plugins in your favorite editor and how flashing is done on MicroPython. The aim is that a beginner should be able to understand.

### Putting everything together

How is all the electronics connected? Describe all the wiring. Good if you can show a circuit diagram. Be specific on how to connect everything and what to think of in terms of resistors, current, and voltage. Is this only for a development setup, or could it be used in production?

- Circuit diagram 

<img src="img/cirdht.PNG" alt="circuit DHT" style="height: 200px; width:200px;"/>
<img src="img/cirmq.PNG" alt="circuit MQ35" style="height: 200px; width:200px;"/>

- *Electrical calculations: NodeMCU ESP8266 always uses between 3.3V to 5V. DHT11 has 3 legs and MQ135 has 4 legs. MQ135 evaluates the gas level via analog A0 in NodeMCU ESP8266. 

### Platform

- Describe platform in terms of functionality: Firebase real-time database service is used as cloud pattern for this IoT project. It is
a free plan for 1GB storage and 10GB downloads per month. If the project has more data to store, it is still a good choice with Firebase for Blazer plan for $0.108 per additional GB. Pusher free plan is used as webhook to send data from API to client with 200 000 message a day.  
- The reason why I choose Firebase because it has supported Arduino project for a long time and the data is up to date fast with real-time data and it is easy to delete or adding data to database directly. The instructions how to work with Firebase for different programming languages are easy and detailed to follow. 

### The code

Import core functions of your code here, and don't forget to explain what you have done! Do not put too much code here. Focus on the core functionalities. Have you done a specific function that does a calculation, or are you using a clever function for sending data on two networks? Or, are you checking if the value is reasonable, etc.? Explain what you have done, including the setup of the network, wireless, libraries and all that is needed to understand.


```C++=
if (Firebase.ready() && (millis() - sendDataPrevMillis > timerDelay || sendDataPrevMillis == 0)){
    sendDataPrevMillis = millis();

    //Get current timestamp
    timestamp = getTime();
    Serial.print ("time: ");
    Serial.println (timestamp);

    parentPath= databasePath + "/" + String(timestamp);

    json.set(tempPath.c_str(), String(dht.readTemperature()));
    json.set(humPath.c_str(), String(dht.readHumidity()));
    json.set(presPath.c_str(), String(h/1023*100));
    json.set(timePath, String(timestamp));
    Serial.printf("Set json... %s\n", Firebase.RTDB.setJSON(&fbdo, parentPath.c_str(), &json) ? "ok" : fbdo.errorReason().c_str());

# This function will read the data for humidity/temperature from DHT11 with help of DHT library and send to FireaBase via wi-fi. The
gas level is collected from A0 analog and calculated then sent to Firebase too.
```

### Data flow / Connectivity

- How often is the data sent? The data is sent every 30 minutes to FireBase and the API will get the last 12 data to show up 
for the client.
- Which wireless protocols did you use (WiFi, LoRa, etc ...)? Wifi protocols has been used
- Which transport protocols were used (MQTT, webhook, etc ...) Pusher is used as webhook to transfer data from API to client.
- *Elaborate on the design choices regarding data transmission and wireless protocols. That is how your choices affect the device range and battery consumption: It depends on how far the IoT from Wi-fi router too. The data is sent every 30 minutes to save the storage on cloud and minimize battery consumptions. 

### Presenting the data

Describe the presentation part. How is the dashboard built? How long is the data preserved in the database?

- [ ] Provide visual examples of how the dashboard looks. Pictures needed.
- [ ] How often is data saved in the database.
- [ ] *Explain your choice of database.
- [ ] *Automation/triggers of the data.


### Finalizing the design

Show the final results of your project. Give your final thoughts on how you think the project went. What could have been done in another way, or even better? Some pictures are nice!

- [ ] Show the final results of the project
- [ ] Pictures
- [ ] Video presentation of the project
