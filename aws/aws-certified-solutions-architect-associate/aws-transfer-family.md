# AWS Transfer Family

* Securely transfer into and out of:
  * S3
  * EFS
* Protocols:
  * SSH (SFTP)
  * FTPS
  * FTP

> FTP & FTPS use ports `8192` => `8200`

Supports up to 3 AZs.  Runs in a ASG EC2 fleet.

Transfer Family Managed File Transfer Workflow ([MFTW](https://aws.amazon.com/aws-transfer-family/faqs/)).

