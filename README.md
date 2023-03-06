#  Unofficial Web Bluetooth remote for Canon cameras

This is a [Web Bluetooth](https://developer.chrome.com/articles/bluetooth/)-based implementation of remote control for Canon EOS cameras based on [prior reverse engineering work](https://iandouglasscott.com/2017/09/04/reverse-engineering-the-canon-t7i-s-bluetooth-work-in-progress/) by [Ian Douglas Scott](https://fosstodon.org/@ids1024).

![Screenshot of the connection screen showing my Canon EOS250D camera in the list.](https://user-images.githubusercontent.com/557590/222991209-e7f1dc7d-d11f-4f70-8019-39f530ceed1b.png)
![Screenshot of the Intervalometer screen, showing settings for number of shots, exposure time and delay between shots followed by a disabled button that says "Shooting 3/10" and a progress bar below.](https://user-images.githubusercontent.com/557590/222991212-f05f743c-db3d-44a7-92eb-25d7e5492d4a.png)

## Disclaimers

First of all, this project is in no way affiliated with Canon and you use it at your own risk.

It mostly works, but I'm having an issue where, once camera goes to sleep, it can't connect again and needs to be unpaired, power-cycled & paired again - still not sure whether that's just my camera or the implementation should be doing some kind of regular pings to keep connection alive.

## See also

[web-gphoto2](https://github.com/GoogleChromeLabs/web-gphoto2) - my other project controlling arbitrary cameras over the cable, powered by gphoto2, WebAssembly and WebUSB. 
