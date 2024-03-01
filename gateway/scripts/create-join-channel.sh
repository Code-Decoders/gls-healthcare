#!/bin/bash

export CORE_PEER_LOCALMSPID=glshcsadminMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsadmin.glshcs.com/peers/peer0.glshcsadmin.glshcs.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsadmin.glshcs.com/users/Admin@glshcsadmin.glshcs.com/msp
export CORE_PEER_ADDRESS=peer0.glshcsadmin.glshcs.com:7051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/glshcs.com/orderers/orderer.glshcs.com/msp/tlscacerts/tlsca.glshcs.com-cert.pem

peer channel create -f channel-artifacts/glshcschannel.tx -c glshcschannel -o orderer.glshcs.com:7050 --tls --cafile $ORDERER_CA
peer channel join -b glshcschannel.block
peer channel update -o orderer.glshcs.com:7050 -c glshcschannel -f channel-artifacts/glshcsadminAnchor.tx --tls --cafile $ORDERER_CA

export CORE_PEER_LOCALMSPID=glshcsuserMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsuser.glshcs.com/peers/peer0.glshcsuser.glshcs.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsuser.glshcs.com/users/Admin@glshcsuser.glshcs.com/msp
export CORE_PEER_ADDRESS=peer0.glshcsuser.glshcs.com:9051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/glshcs.com/orderers/orderer.glshcs.com/msp/tlscacerts/tlsca.glshcs.com-cert.pem

peer channel join -b glshcschannel.block
peer channel update -o orderer.glshcs.com:7050 -c glshcschannel -f channel-artifacts/glshcsuserAnchor.tx --tls --cafile $ORDERER_CA