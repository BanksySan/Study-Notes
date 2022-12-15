# CIDR Notation

Classless Inter-Domain Routing

## Class-based Routing

| Class |        From |                 To |
|:-----:|------------:|-------------------:|
|  `A`  |   `0.0.0.0` |  `127.255.255.255` |
|  `B`  | `128.0.0.0` |  `191.255.255.255` |
|  `C`  | `192.0.0.0` | `223.255.255.255 ` |
|  `D`  | `224.0.0.0` |  `239.255.255.255` |
|  `E`  | `240.0.0.0` |  `255.255.255.255` |

## Subnet mask

A subnet mask is a 32-bit array, of which some number of leftmost bits are `1` and the rest are `0`.  The purpose is to allow a computationally efficient method of determining if a given IP address is within a given subnet.

## CIDR

An IP address consists of four octets, so 32 bits in total.  The CIDR notation consists of two parts, a subnet _base_ address, and a mask size in th form:

```CIDR
a.b.c.d/n
```

Where

```text
a, b, c, d := IP Address octets
         n := Size of the mask
```

The size of the mask represents the number of `1` bits, counted from the left.  For example, we could write the IP address `10.20.30.40` in binary as:

```text
00001010.00010100.00011110.00101000
```

The CIDR `10.20.30.40/24` would be the above address with the mask:

```text
00001010.00010100.00011110.00101000
11111111.11111111.11111111.00000000
```

To discover the subnet address from the above, we perform a bitwise `AND` on the IP and the mask.

```text
00001010.00010100.00011110.00101000
&
11111111.11111111.11111111.00000000
___________________________________
00001010.00010100.00011110.00000000
___________________________________
```

> Note that this means that different CIDRs can be equivalent.  In the above example, the rightmost eight bits are ignores, so all the permutations of bits in that range will result in the same subnet definition.

