# Network Interface Cards

## Types

NB: In order of performance

ENI
: Elastic Network Adapter
: A basic virtual NIC.

ENA
: Elastic Network Adapter
: Single root I/O virtualisation.

EFA
: Elastic Fabric Adaptor
: High performance computing (HPC) and machine learning applications.

## ENI

## ENA

There are two implementations:
1. Standard/basic/default.  Supports `<= 100 Gbps`.
2. Intel 82599 Virtual Function.  `<= 10 Gpbs`.

## EFA

Attached to EC2 instances to support EPC.
Supports _OS bypass_, but the traffic is limited to a single subnet and is not routable.
