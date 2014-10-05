# Chewbacopter
View data from AR-Drone in terminal while you're flying solo.

## API

### #use(ar-drone-client, ['properties'])
The first argument tells the chewbacopter which drone client to use, and
the second (and optional) argument lets you choose which data points to display.
Not passing this argument will return all available data.
This function will also set the client's navdata_demo config to '"TRUE"'.
Returns chewbacopter instance.

### #monitor()
When called, the chewbacopter instance will start listening to events
on the `navdata.demo` object, and display output in the terminal.
Returns chewbacopter instance.
