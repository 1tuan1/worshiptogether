'use strict'
const request = require('request')
const cheerio = require('cheerio')
const _ = require('lodash')
const htmlToText = require('html-to-text')

const requestOptions = 'http://worship-songs-resources.worshiptogether.com/search?w='

const getSong = (body, filter = false, type = '') => {
    let content = []
    const $ = cheerio.load(body, {
        xmlMode: true
    })
    if (filter) {
        $('[data-tb-sid=st_result-container-wrapper]').each((key, e) => {
            if (htmlToText.fromString($(e).find('div[data-tb-sid=st_generic-link-wrapper]').text()) == type) {
                content.push({
                    title: htmlToText.fromString($(e).find('h2').text()),
                    type: htmlToText.fromString($(e).find('div[data-tb-sid=st_generic-link-wrapper]').text()),
                    description: htmlToText.fromString($(e).find('p[data-tb-sid=st_description]').text()),
                    conditional: htmlToText.fromString($(e).find('span[data-tb-sid=st_conditional] p').text()),
                    url: $(e).find('a[data-tb-sid=st_title-link]').attr('title'),
                })
            }
        })
    } else {
        $('[data-tb-sid=st_result-container-wrapper]').each((key, e) => {
            content.push({
                title: htmlToText.fromString($(e).find('h2').text()),
                type: htmlToText.fromString($(e).find('div[data-tb-sid=st_generic-link-wrapper]').text()),
                description: htmlToText.fromString($(e).find('p[data-tb-sid=st_description]').text()),
                conditional: htmlToText.fromString($(e).find('span[data-tb-sid=st_conditional] p').text()),
                url: $(e).find('a[data-tb-sid=st_title-link]').attr('title'),
            })
        })
    }
    return content
}

module.exports = {
    autocomplete: (query, callback) => {
        request(requestOptions + query, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                callback(getSong(body))
            }
        })
    },
    searchSong: (query, callback) => {
        request(requestOptions + query, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                callback(callback(getSong(body, true, 'Song')))
            }
        })
    },
    searchVideo: (query, callback) => {
        request(requestOptions + query, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                callback(callback(getSong(body, true, 'Video')))
            }
        })
    },
    get: (query, callback) => {
        request(query, (error, response, body) => {
            if (error) {
                callback(error, null, response, body)
            } else if (response.statusCode !== 200) {
                callback(new Error('Bad response'))
            } else {
                let song = []
                const $ = cheerio.load(body, {
                    xmlMode: false
                })
                song.push({
                    title: htmlToText.fromString($('h1').text()),
                    key: htmlToText.fromString($('#chordPro .transposeControls #keySelector option:nth-child(1)').val()),
                    chord: $('#chordPro > .chordProContainer .chord-pro-line').text(),
                })
                callback(song)
            }
        })
    }
}
