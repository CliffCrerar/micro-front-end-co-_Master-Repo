
# Micro Front Ends Demo
---

# About Micro Frameworks:
---
* [Micro-frontends decisions framework](https://medium.com/@lucamezzalira/micro-frontends-decisions-framework-ebcd22256513)
* [Micro front ends](https://micro-frontends.org/)
* [Micro front ends - Martin Fowler](https://martinfowler.com/articles/micro-frontends.html)

# The Demo

Repo Manifest:
1. [Master Repo](https://github.com/CliffCrerar/micro-front-end-co-_Master.git) (This Repo)
1. [Root Config](https://github.com/CliffCrerar/micro-front-end-co-Root.git)
1. [Navbar](https://github.com/CliffCrerar/micro-front-end-co-Navbar.git)
1. [Page One](https://github.com/CliffCrerar/micro-front-end-co-PageOne.git)
1. [Page Two](https://github.com/CliffCrerar/micro-front-end-co-PageTwo.git)

# Development:

Dev Tech:
* VSCODE
* create-single-spa
* Git
* Webpack Dev Server

TODO: Cloning task

TODO: Running Task - Runn all parts together in correct port order for local dev

# Deployment:

## Setup 

### CI/CD tech:

* [AWS S3 Bucket as Micro Front End Host.](https://aws.amazon.com/free/storage/s3/?trk=ps_a134p000003yHmtAAE&trkCampaign=acq_paid_search_brand&sc_channel=PS&sc_campaign=acquisition_EEM&sc_publisher=Google&sc_category=Storage&sc_country=EEM&sc_geo=EMEA&sc_outcome=acq&sc_detail=aws%20s3&sc_content=S3_e&sc_segment=444219542114&sc_medium=ACQ-P|PS-GO|Brand|Desktop|SU|Storage|Product|EEM|EN|Text&s_kwcid=AL!4422!3!444219542114!e!!g!!aws%20s3&ef_id=CjwKCAjwmrn5BRB2EiwAZgL9ooNbADodASuGkvDTQxIg9buPDgdoo2hB3ZtWBTc0cUEtHp7ZEVOIZxoCp1IQAvD_BwE:G:s&s_kwcid=AL!4422!3!444219542114!e!!g!!aws%20s3)
* [Travis CI/CD Pipeline.](https://travis-ci.com/)
* [Jest]()
* [Webpack]()

### CI

Using `create-single-spa` the unit tests run when code it committed, failing test revokes the commit so by the time the code reaches the remote the unit tests have been successful already expiditing the rest of the deployment pipeline.

### CD

#### Travis

Each micro front end has its own life cycle like it has its own repository.

```yml
language: node_js
node_js:
  - node
script:
  - npm build
  - echo "Commit sha - $TRAVIS_COMMIT"
  - mkdir -p dist/micro-front-end-co/root-config/$TRAVIS_COMMIT
  - mv dist/*.* dist/micro-front-end-co/root-config/$TRAVIS_COMMIT/
deploy:
  provider: s3
  access_key_id: "$AWS_ACCESS_KEY_ID"
  secret_access_key: "$AWS_SECRET_ACCESS_KEY"
  bucket: "micro-front.softwarecraft.co.za"
  region: "eu-west-2"
  cache-control: "max-age=31536000"
  acl: "public_read"
  local_dir: dist
  skip_cleanup: true
  on:
    branch: master
```

### AWS S3

1. Programmatic IAM user on least privilege principle basis. The chosen policy as follows:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowPublicRead",
            "Effect": "Allow",
            "Action": [
                "s3:AbortMultipartUpload",
                "s3:DeleteObject",
                "s3:GetObject",
                "s3:GetObjectAcl",
                "s3:PutObject",
                "s3:PutObjectAcl"
            ],
            "Resource": "arn:aws:s3:::BUCKET_NAME/*"
        }
    ]
}
```

2. Create bucket and configure cors on the S3 Bucket:

```xml
<CORSConfiguration>
 <CORSRule>
   <AllowedOrigin>*</AllowedOrigin>
   <AllowedMethod>GET</AllowedMethod>
 </CORSRule>
</CORSConfiguration>
```

3. Bucket policy

```json
{
  "Version": "2014-09-25",
  "Statement":[{
    "Sid":"AllowPublicRead",
        "Effect":"Allow",
      "Principal": "*",
      "Action":["s3:GetObject"],
      "Resource":["arn:aws:s3:::"YOUR BUCKET NAME"/*"
      ]
    }
  ]
}
```




