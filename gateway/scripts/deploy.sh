#!/bin/bash

export PATH=/opt/fabric/fabric-samples/bin:$PATH
export FABRIC_CFG_PATH=/opt/fabric/fabric-samples/config

# Verify peer setup
peer version
peer lifecycle chaincode package gls-health-care.tar.gz --path /home/astar/Code/web/gls-fiber-api/chaincode --lang node --label gls-health-care_1.0

# first organization config
export CORE_PEER_TLS_ENABLED=true
export CORE_PEER_LOCALMSPID="Org1MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp
export CORE_PEER_ADDRESS=localhost:7051

# Install chaincode
peer lifecycle chaincode install gls-health-care.tar.gz

# second organization config
export CORE_PEER_LOCALMSPID="Org2MSP"
export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org2.example.com/users/Admin@org2.example.com/msp
export CORE_PEER_ADDRESS=localhost:9051

# Install chaincode
peer lifecycle chaincode install gls-health-care.tar.gz

# Approve chaincode
peer lifecycle chaincode queryinstalled

