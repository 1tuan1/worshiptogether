## worshiptogether

This module will help you to get API response from website http://www.worshiptogether.com/

examples
```javascript
const wt = require('./index')

wt.searchSong('oceans', songs =>  {
    console.log(songs)
})
```
---
```javascript
const wt = require('./index')

wt.autocomplete('10000', songs =>  {
    console.log(songs)
})
```
---
```javascript
const wt = require('./index')

wt.searchVideo('10000', songs =>  {
    console.log(songs)
})
```
---
```javascript
const wt = require('./index')


wt.get('http://www.worshiptogether.com/songs/good-good-father-tomlin', tab =>  {
        console.log(tab)
    })
```

#### or

```javascript
const wt = require('./index')

wt.searchSong('oceans', songs =>  {
    wt.get(songs[0], tab =>  {
        console.log(tab)
    })
})
```
