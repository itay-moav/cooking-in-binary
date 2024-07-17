CIB-CLOUDFRONT-MULTI-SPA-LAMBDA-EDGE
====================================
(SPA = Single Page Apps)  
This stack shows how to create the s3, cloudfront, subdomain and lambda edge to support a two or more level deep single page apps like React/Angular/Vue etc.
This will allow a user page refresh and route the app to the page the user was on, rather than to the defaule html page of the distribution.

What can you learn from this:  
=============================
1. create a subdomain with ssl and attach to a CloudFront distribution
2. Create a private S3 bucket that will be an ORIGIN for a CloudFront distribution
3. Create a Lambda, deploy as edge to a specific CloudFront
4. Simple Lambda that handles user request event.

Components
==========
- Lambda : The lambda handles a user request event to a CloudFront distro, and modifies the object to be served. Rules in this Lambda are to serve as is any url with "." in it, otherwise serve the /part1/part2/index.html 
- S3 to host the SPA and to serve as ORIGIN to the CloudFront
- CloudFront
- Subdomain to be attached to the CloudFront + SSL (assuming u already have SSL configured *.your.domain)
- Several static pages to handle default routing for CloudFront and default error handling. (under /static-pages). Those are synced into the S3 in the deploy-stack script

Dependencies
============
1. You have a domain setup in Route53  
2. You have a *.domain.name SSL created for the domain above. 

Before you deploy
=================
Make sure to fill in the template.yaml the following values:
1. CIBHostedZoneId  (This is the zone id from Route53)
2. CIBCertificateArn (This is the SSL certificate ARN attached to the Zone ID above)
3. CIBDomainName     (This is the domain name without any subdomain)  
  
    
    
**Happy hacking, modify this as u pls. Do send me questions via github if you need any help**