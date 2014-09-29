# Chewbacopter
View data from AR-Drone in terminal while you're flying solo.

## API

### #use(ar-drone-client)
Tells chewbacopter which drone client to use.
Will set the client's navdata_demo config to '"TRUE"'.
Returns chewbacopter instance.

### #copilot()
When called, the chewbacopter instance will start listening to events
on the `navdata.demo` object, and display output in the terminal.
Returns chewbacopter instance.
