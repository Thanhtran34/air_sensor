# Template

**Please keep the total length of the tutorial below 25k characters.** You can include code that is linked to a repository. Keep the code snippets in the tutorial short.

## Tutorial on how to build a temperature and humidity sensor

Give a short and brief overview of what your project is about.
What needs to be included:

- [x] Title
- [x] Your name and student credentials (xx666x)
- [x] Short project overview
- [x] How much time it might take to do (approximation)

### Objective

Describe why you have chosen to build this specific device. What purpose does it serve? What do you want to do with the data, and what new insights do you think it will give?

- [x] Why you chose the project
- [x] What purpose does it serve
- [x] What insights do you think it will give

### Material

Explain all material that is needed. All sensors, where you bought them and their specifications. Please also provide pictures of what you have bought and are using.

- [x] List of material
- [x] What the different things (sensors, wires, controllers) do - short specifications
- [x] Where you bought them and how much they cost


> Example:
>| IoT Thing | For this         |
>| --------- | ---------------- |
>| Perhaps   | a table          |
>| is a      | jolly good idea? |
>
>In this project, I have chosen to work with the Pycom LoPy4 device, as seen in Fig. 1. It's a neat little device programmed by MicroPython and has several connectivity bands. The device has many digital and analog inputs and outputs and is well suited for an IoT project.
>
>![LoPy!](https://pycom.io/wp-content/uploads/2018/08/lopySide-1.png =360x)
>Fig. 1. LoPy4 with headers. Pycom.io


### Computer setup

How is the device programmed? Which IDE are you using? Describe all steps from flashing the firmware to installing plugins in your favorite editor and how flashing is done on MicroPython. The aim is that a beginner should be able to understand.

- [x] Chosen IDE
- [x] How the code is uploaded
- [x] Steps that you needed to do for your computer. Installation of Node.js, extra drivers, etc.

### Putting everything together

How is all the electronics connected? Describe all the wiring. Good if you can show a circuit diagram. Be specific on how to connect everything and what to think of in terms of resistors, current, and voltage. Is this only for a development setup, or could it be used in production?

- [x] Circuit diagram (can be hand drawn)
- [x] *Electrical calculations

### Platform

Describe your choice of platform. If you have tried different platforms, it can be good to provide a comparison.

Is your platform based on a local installation or a cloud? Do you plan to use a paid subscription or a free one? Describe the alternatives going forward if you want to scale your idea.

- [x] Describe platform in terms of functionality
- [x] *Explain and elaborate on what made you choose this platform 

### The code

Import core functions of your code here, and don't forget to explain what you have done! Do not put too much code here. Focus on the core functionalities. Have you done a specific function that does a calculation, or are you using a clever function for sending data on two networks? Or, are you checking if the value is reasonable, etc.? Explain what you have done, including the setup of the network, wireless, libraries and all that is needed to understand.


```python=
import this as that

def my_cool_function():
    print('not much here')

s.send(package)

# Explain your code!
```


### Data flow / Connectivity

How is the data transmitted to the internet or local server? Describe the package format. All the different steps that are needed in getting the data to your end-point. Explain both the code and choice of wireless protocols and API information models, if any.


- [x] How often is the data sent? 
- [x] Which wireless protocols did you use (WiFi, LoRa, etc ...)?
- [x] Which transport protocols were used (MQTT, webhook, etc ...)
- [x] Which information models were used (WoT TD, Fiware, etc...)
- [x] *Elaborate on the design choices regarding data transmission and wireless protocols. That is how your choices affect the device range and battery consumption.


### Presenting the data

Describe the presentation part. How is the dashboard built? How long is the data preserved in the database?

- [x] Provide visual examples of how the dashboard looks. Pictures needed.
- [x] How often is data saved in the database.
- [x] *Explain your choice of database.
- [x] *Automation/triggers of the data.


### Finalizing the design

Show the final results of your project. Give your final thoughts on how you think the project went. What could have been done in another way, or even better? Some pictures are nice!

- [x] Show the final results of the project
- [x] Pictures
- [x] Video presentation of the project
