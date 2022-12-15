# Dave's VPC Workshop

## Key Components

1. EC2
   1. Must exist in a subnet.
   2. Security Groups
   3. Key Pairs
      1. PEM v PPK
2. Subnet
   1. Must exist in a VPC
   2. Exists in a single AZ
   3. Route Tables
      1. A subnet must have one route table, a route table can be used by many subnets.
   4. NAT Gateway & NET Instance
      1. Allow private subnets to connect to the Internet.
      2. Allow outbound traffic, not inbound.
3. VPC
   1. Exists in single region.
   2. Span multiple AZs.
   3. NACL
   4. Security Groups
4. VPN
   1. Connects various services, on premises and on AWS into a virtual network.
