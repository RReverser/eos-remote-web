#  Unofficial Web Bluetooth remote for Canon EOS cameras

This is a [Web Bluetooth](https://developer.chrome.com/articles/bluetooth/)-based implementation of remote control for Canon EOS cameras based on [prior reverse engineering work](https://iandouglasscott.com/2017/09/04/reverse-engineering-the-canon-t7i-s-bluetooth-work-in-progress/) by [Ian Douglas Scott](https://fosstodon.org/@ids1024).

It mostly works, but I'm having issues where, once camera goes to sleep, it can't connect again and needs to be unpaired & paired all over - still not sure whether that's just my camera or the implementation should be doing some kind of regular pings to keep connection alive.

**NOTE:** This project is in no way affiliated with Canon and you use it at your own risk.
