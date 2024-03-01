if [ $# -eq 0 ]
  then
    echo "No arguments supplied"
    echo "#1 Chaincode Label"
    echo "#2 Chaincode Version"
    echo "#3 Chaincode Sequence"
    exit 1
fi
# before packaging Go chaincode, vendoring Go dependencies is required like the following commands.
cd /opt/gopath/src/github.com/hyperledger/fabric-samples/chaincode/
GO111MODULE=on go mod vendor
cd -

peer lifecycle chaincode package healthcare.tar.gz --path /opt/gopath/src/github.com/hyperledger/fabric-samples/chaincode/ --lang golang --label $1

export CORE_PEER_LOCALMSPID=glshcsadminMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsadmin.glshcs.com/peers/peer0.glshcsadmin.glshcs.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsadmin.glshcs.com/users/Admin@glshcsadmin.glshcs.com/msp
export CORE_PEER_ADDRESS=peer0.glshcsadmin.glshcs.com:7051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/glshcs.com/orderers/orderer.glshcs.com/msp/tlscacerts/tlsca.glshcs.com-cert.pem

peer lifecycle chaincode install healthcare.tar.gz
export CCID=$(peer lifecycle chaincode queryinstalled | cut -d ' ' -f 3 | sed s/.$// | grep $1)
peer lifecycle chaincode approveformyorg --package-id $CCID --channelID glshcschannel --name $1 --version $2 --sequence $3 --waitForEvent --tls --cafile $ORDERER_CA 
peer lifecycle chaincode checkcommitreadiness --channelID glshcschannel --name $1 --version $2  --sequence $3 --tls --cafile $ORDERER_CA

export CORE_PEER_LOCALMSPID=glshcsuserMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsuser.glshcs.com/peers/peer0.glshcsuser.glshcs.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsuser.glshcs.com/users/Admin@glshcsuser.glshcs.com/msp
export CORE_PEER_ADDRESS=peer0.glshcsuser.glshcs.com:9051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/glshcs.com/orderers/orderer.glshcs.com/msp/tlscacerts/tlsca.glshcs.com-cert.pem

peer lifecycle chaincode install healthcare.tar.gz
export CCID=$(peer lifecycle chaincode queryinstalled | cut -d ' ' -f 3 | sed s/.$// | grep $1)
peer lifecycle chaincode approveformyorg --package-id $CCID --channelID glshcschannel --name $1 --version $2 --sequence $3 --waitForEvent --tls --cafile $ORDERER_CA 
peer lifecycle chaincode checkcommitreadiness --channelID glshcschannel --name $1 --version $2  --sequence $3 --tls --cafile $ORDERER_CA

export CORE_PEER_LOCALMSPID=glshcsadminMSP
export CORE_PEER_TLS_ROOTCERT_FILE=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsadmin.glshcs.com/peers/peer0.glshcsadmin.glshcs.com/tls/ca.crt
export CORE_PEER_MSPCONFIGPATH=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/peerOrganizations/glshcsadmin.glshcs.com/users/Admin@glshcsadmin.glshcs.com/msp
export CORE_PEER_ADDRESS=peer0.glshcsadmin.glshcs.com:7051
export ORDERER_CA=/opt/gopath/src/github.com/hyperledger/fabric/peer/crypto/ordererOrganizations/glshcs.com/orderers/orderer.glshcs.com/msp/tlscacerts/tlsca.glshcs.com-cert.pem

peer lifecycle chaincode commit -o orderer.glshcs.com:7050 --channelID glshcschannel --name $1 --version $2 --sequence $3 --tls true --cafile $ORDERER_CA --peerAddresses peer0.glshcsadmin.glshcs.com:7051 --peerAddresses peer0.glshcsuser.glshcs.com:9051 --tlsRootCertFiles ./crypto/peerOrganizations/glshcsadmin.glshcs.com/peers/peer0.glshcsadmin.glshcs.com/tls/ca.crt --tlsRootCertFiles ./crypto/peerOrganizations/glshcsuser.glshcs.com/peers/peer0.glshcsuser.glshcs.com/tls/ca.crt
