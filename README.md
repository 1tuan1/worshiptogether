## worshiptogether

This module will help you to get API response from website http://www.worshiptogether.com/

examples
```javascript
const wt = require('worshiptogether')

wt.searchSong('oceans', songs =>  {
    console.log(songs)
})
```
---
```javascript
const wt = require('worshiptogether')

wt.autocomplete('10000', songs =>  {
    console.log(songs)
})
```
---
```javascript
const wt = require('worshiptogether')

wt.searchVideo('10000', songs =>  {
    console.log(songs)
})
```
---
```javascript
const wt = require('worshiptogether')


wt.get('http://www.worshiptogether.com/songs/good-good-father-tomlin', tab =>  {
        console.log(tab)
    })
```

#### or

```javascript
const wt = require('worshiptogether')

wt.searchSong('oceans', songs =>  {
    wt.get(songs[0], tab =>  {
        console.log(tab)
    })
})
```
