# Deploying on AWS - Day 1

I wanted to learn how the public cloud works. Specifically, how do I deploy an application on the internet in 2021. To learn how to do this, I decided to deploy my [fork](https://github.com/arorashu/arxiv-sanity-preserver) of the awesome [arxiv-sanity-preserver](https://github.com/karpathy/arxiv-sanity-preserver). This fork serves paper from the arxiv [category](https://arxiv.org/category_taxonomy) cs.DC (Distributed, Parallel, and Cluster Computing). Since AWS is the most popular cloud provider, I will deploy the application on AWS. Let's get started.

# 1. Run Locally

The project README provides fairly good documentation on how to run the project. I set up and run the website on my personal computer. Since I am testing that everything works, I only download 100 recent papers, by passing the `--max-index`  argument.

Following all the steps, I can access the application on my local machine by browsing to [https://localhost:5000](https://localhost:5000) . 

# 2. Deploy on an AWS

Now, I want to deploy the application to AWS. Specifically, I want to access the app from any computer connected to the internet.

## 2.1 Create an AWS EC2 Instance

I created an EC2 instance with the Ubuntu OS. It has 1vCPU, 1GB of RAM and 8GB of attached SSD. (this is free in the AWS free tier). Instructions [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EC2_GetStarted.html#ec2-clean-up-your-instance).

When creating the instance, I allow access to the SSH port (22) and HTTP port (80). This is so we can SSH into the machine, and communicate with our app running on the machine via HTTP.

## 2.2 Install dependencies

After creating the AWS instance, I connect to the instance using SSH. Then, I installed the relevant dependencies for my app using `apt`:

```bash
$ sudo apt update
$ sudo apt-get install imagemagick poppler-utils python3-virtualenv sqlite3
```

and installed mongodb using:

```bash
# install mongodb
# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
$ wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
$ echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org

# To prevent unintended upgrades, pin the package at the currently installed version
$ echo "mongodb-org hold" | sudo dpkg --set-selections
$ echo "mongodb-org-server hold" | sudo dpkg --set-selections
$ echo "mongodb-org-shell hold" | sudo dpkg --set-selections
$ echo "mongodb-org-mongos hold" | sudo dpkg --set-selections
$ echo "mongodb-org-tools hold" | sudo dpkg --set-selections
```

## 2.3 Run application

Then, I installed the app dependencies as in [1. Run Locally](https://www.notion.so/Day-1-252b37c81d6a46c284ea7fa4d633435f), and run the app. To start the application in production mode, I run the [serve.py](http://server.py) with the `--prod` flag. i.e. `python serve.py --prod`. By default the app runs on port 5000. Since the storage on the instance is limited (8 GB), for now, I only fetched 400 papers. I will fix this in the future.

To chech that the app is running, on another terminal on the instance, run :

`$ curl [localhost:5000](http://localhost:5000) | less`

This shows the HTML response of the web server. The server logs (output in terminal running `python [serve.py](http://serve.py) --prod`) will show what HTTP resource accessed and the response (200 OK, if everything works correctly). 

## 2.4 Redirect HTTP traffic to the application server

Now, the application is running on port 5000, but the instance only allows public access on HTTP port 80. So, navigating to the the public IPv4 address of the instance (i.e. `[http://instance-ip-address](http://instance-ip-address:5000)`), it will not load anything. There are a 2 options now. 

1. open up port 5000 to the world
This isn't a good option, because now to view the application, you will have to go to `[http://instance-ip-address:5000](http://instance-ip-address:5000)` . Thar is clunky and bad.
2. Redirect port 80 to port 5000 (where our app is running)
This is the standard way, because by default [http://instance-ip-address](http://instance-ip-address/) navigates to [http://instance-ip-address](http://instance-ip-address/):80

To redirect the traffic, I then use the linux `iptables` command ([reference](https://www.cyberciti.biz/faq/linux-port-redirection-with-iptables/)):

```bash
$ iptables -t nat -A PREROUTING -i eth0 -p tcp --dport $srcPortNumber -j REDIRECT --to-port $dstPortNumber
```

where replace $srcPortNumber with 80 and $dstPortNumber with 5000.
Now, on navigating to [http://instance-ip-address](http://instance-ip-address/), I can see the app running!

However, testing this by running `$ curl [localhost](http://localhost) | less` on the instance itself would not work. To enable the redirect on the instance, I invoke the `iptables` command as ([reference](https://askubuntu.com/questions/444729/redirect-port-80-to-8080-and-make-it-work-on-local-machine)):

```bash
$ iptables -t nat -A OUTPUT -o lo -p tcp --dport 80 -j REDIRECT --to-port 5000
```

Now, the HTTP response from the instance can be checked using curl as well.

# Result

At this stage, the application is running on an AWS EC2 instance, and is publically accessible by visiting [http://instance-ip-address](http://instance-ip-address/)!

# Learnings

In this exercise, I learned the following:

1. Creating and accessing an AWS EC2 instance
2. How to redirect network traffic from one TCP port to another

# Up Next

The application works right now, but a lot of improvements should be made to call this a production level deployment. I will tackle this step by step. The immediate next steps are.

## 1. Connect to an external storage

EC2 instances are ephemeral, i.e. they can be stopped and terminated. Once an instance is terminated (accidentally or AWS goes down or what not), the data stored in the storage attached to that instance is lost. 

A better strategy is to store the application data in a database (like Dynamo DB) or a stable data store (like [Amazon S3](https://aws.amazon.com/s3/)). In our application, the data is the txt files that are created after pdf to text conversion. 

## 2. Use a load balancer to redirect traffic

In [2.4](https://www.notion.so/Day-1-252b37c81d6a46c284ea7fa4d633435f), I used `iptables` to redirect traffic from port 80 to 5000. This configuration will need to be created everytime a new instance is created. A more robust strategy may be to use a [load balancer](https://aws.amazon.com/elasticloadbalancing/classic-load-balancer/), that receives public connections on port 80, and internally redirects all the traffic to the EC2 instance on port 5000. This is more complex to setup, as we need to pay more attention to the security groups settings. For a more complex application, this allows serving more concuurent HTTP requests by scaling out to multiple running instances.  I will explore this in the future.


