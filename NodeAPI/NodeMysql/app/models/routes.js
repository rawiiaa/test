const router = require('express').Router();
const express = require('express');
const app = express();
var mysql = require('mysql');
const { end } = require('../config/db.connexion');
const connection = require('../config/db.connexion');

router.get('/location/:imei?/:startdate?/:enddat?/:numPage/:nbItemByPage', (req, res) => {
        let ime=req.params.imei
        let numPage =req.params.numPage
        let nbItemByPage =req.params.nbItemByPage
        let startdate =req.params.startdate
        let enddate =req.params.enddat
        if (ime == null) {
          res.status(400).send({messsage:"Enter the imei"})
        }
        
         else if(startdate || enddate == null) {
          connection.query(`SELECT * FROM locations_history WHERE imei = ${ime} LIMIT ${numPage} OFFSET ${nbItemByPage}` ,(err, rows) => {
            try{
              if (rows.length === 0){
                res.status(500).json(rows)
               }
               else{
                res.status(200).json(rows)
  
               }}
               catch(err){
                res.status(500).json(err)
               }
        
              })
        }
        else{   
        connection.query(`SELECT * FROM locations_history WHERE imei = ${ime} and (date BETWEEN ${startdate} AND ${enddate}) LIMIT ${numPage} OFFSET ${nbItemByPage}` ,(err, rows) => {
          try{
            if (rows.length === 0){
              res.status(500).json(rows)
             }
             else{
              res.status(200).json(rows)

             }}
             catch(err){
              res.status(500).json(err)
             }
      
            })
              
            }
        });

router.get('/:imei?/:startdate?/:enddate?/:numPage/:nbItemByPage',(req, res) => {
      let ime=req.params.imei
      let numPage =req.params.numPage
      let nbItemByPage =req.params.nbItemByPage
      let startdate =req.params.startdate      
      let enddate =req.params.enddate  
      if (ime == null) {
        res.status(400).send({messsage:"Enter the imei"})
      }
      else if(startdate || enddate == null){
        connection.query(`SELECT * FROM io_history WHERE imei = ${ime} LIMIT ${numPage} OFFSET ${nbItemByPage}` ,(err, rows) => {
          try{
          if (rows.length === 0){
            res.status(500).json(rows)
           }
           else{
            res.status(200).json(rows)
           }}
           catch(err){
            res.status(500).json(err)
           }
    
          })
      }
      else{   
     connection.query(`SELECT * FROM io_history WHERE imei = ${ime} and (date BETWEEN ${startdate} AND ${enddate}) LIMIT ${numPage} OFFSET ${nbItemByPage}` ,(err, rows) => {
      try{
      if (rows.length === 0){
        res.status(500).json(rows)
       }
       else{
        res.status(200).json(rows)
       }}
       catch(err){
        res.status(500).json(err)
       }

      })
        
      }
  });

router.get('/sos/:userid?/:startdate?/:enddate?/:numPage/:nbItemByPage', (req, res) => {
    let userid=req.params.userid
    let numPage =req.params.numPage
    let nbItemByPage =req.params.nbItemByPage
    let startdate =req.params.startdate      
    let enddate =req.params.enddate
    if (userid == null) {
      res.status(400).send({messsage:"Enter the imei"})
    } 
    else if(startdate || enddate == null){
      connection.query(`SELECT * FROM sos_history WHERE user_id = ${userid} LIMIT ${numPage} OFFSET ${nbItemByPage}` ,(err, rows) => {
        try{
          if (rows.length === 0){
            res.status(500).json(rows)
           }
           else{
            res.status(200).send(rows)
           }}
           catch(err){
            res.status(500).json(err)
           }
    
          })}
    else{     
    connection.query(`SELECT * FROM sos_history WHERE user_id = ${userid} and (date BETWEEN ${startdate} AND ${enddate}) LIMIT ${numPage} OFFSET ${nbItemByPage}` ,(err, rows) => {
      try{
        if (rows.length === 0){
          res.status(500).json(rows)
         }
         else{
          res.status(200).send(rows)
         }}
         catch(err){
          res.status(500).json(err)
         }
  
        })
          
        }
    });

router.get('/:imei/io', (req, res) => {
      let ime=req.params.imei
      console.log("idddd"+ime)
      connection.query(`SELECT date FROM io_history where imei = ${ime} ORDER BY date desc LIMIT 1` ,(err, rows) => {
        try{
          if (rows.length === 0){
            res.status(500).json(rows)
           }
           else{
            res.status(200).json(rows)
           }}
           catch(err){
            res.status(500).json(err)
           }
    
          })
            
        
      });

router.get('/:imei?/teltonika', (req, res) => {
        let ime=req.params.imei
        if (ime == null) {
          res.status(400).send({messsage:"Enter the imei"})
        }
        else{   
        connection.query(`SELECT * FROM locations_history WHERE imei = ${ime} ORDER BY date desc LIMIT 1` ,(err, rows) => {
          try{
            if (rows.length === 0){
              res.status(500).json(rows)
             }
             else{
              res.status(200).json(rows)
              console.log(rows)
             }}
             catch(err){
              res.status(500).json(err)
             }
      
            })
              
            }
        });
  module.exports = router