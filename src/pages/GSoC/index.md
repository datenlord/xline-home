## Introduction

This page lists the project ideas for Google Summer of Code 2024.
The ideas comes from serveral projects:

- DatenLord  
  An application-orientated, cloud-native distributed storage system. [Repo](https://github.com/datenlord/datenlord)
- Xline  
  A geo-distributed KV store for metadata management. [Repo](https://github.com/xline-kv/Xline)
- Xline Client  
  Xline client SDK, we currently provides clients written in rust/go/python/java. [Repo](https://github.com/xlinehttps://github.com/xline-kv)

  We use Rust as our main language for all our projects. The Xline client project may require the use of additional languages.

## About GSoC

Google Summer of Code is a global, online program focused on bringing new contributors into open source software development. GSoC Contributors work with an open source organization on a 12+ week programming project under the guidance of mentors. If you are new to GSoC, please refer to the GSoC website to learn [how it works](https://summerofcode.withgoogle.com/how-it-works). Please note that the deadline for this year’s GSoC application is April 2nd at 18:00 UTC.

## Information for Contributors

- You can choose an idea from this page, but if you have something else in mind, you may modify the ideas or submit your own proposals.
- Get in touch on [Github](https://github.com/xline-kv/Xline) or [Discord](https://discord.com/invite/hqDRtYkWzm), feel free to ask questions and tell us what you are passionate about.
- All projects require a good knowledge of Rust and distributed systems.
- Please read the Contribute Guide([Xline](https://github.com/xline-kv/Xline/blob/master/CONTRIBUTING.md), [datenlord](https://github.com/datenlord/datenlord#how-to-contribute)) of each project before you start working on the coding.
- If you are unable to participate in our GSoC program for any reason, you are still welcome to choose an idea from this page if there are no existing contributors.
- Contributors are selected based on their past experience and skills. Please contact us in advance to confirm your eligibility for the tasks.
- We will continue to update tasks and descriptions. Please check this page from time to time if you want to participate in our projects.

## Ideas

### Integrating Xline to DatenLord

- Difficulty: Easy
- Skills required: Rust, Etcd
- Expected Project size: 90 hours
- Description: The primary objective of DatenLord is to enable high availability across multi-cloud, hybrid-cloud, and multiple data centers, which often results in high latency situations. Currently, we utilize Etcd as the metadata storage in the DatenLord project. However, we are planning to transition to Xline, which offers improved throughput in such scenarios.
- Expected Outcome:
  - Replace Etcd with Xline in datenlord project
  - Benchmark the performance before and after changes
- Possible mentors: Yang Fengming, Su Jinyang

### Improve Transaction Validation

- Difficulty: Medium
- Skills required: Rust, Etcd, knowledge to common data structures
- Expected Project size: 90 hours
- Description: We want to ensure that in Xline, individual transactions do not have overlapping puts and deletes operations. The current validation implementation has a high time complexity and can potentially impact performance for transactions with multiple operations. Additionally, we are uncertain about the correctness of this implementation and there may be potential bugs present.
- Expected Outcome:
  - Implement the Interval Tree for range overlapping checks.
  - Refactor txn validation and provides correctness proof.
  - Write unit tests.
- Possible mentors: Yin Zhenghao, Zhao Jiawei

### Xline C Client

- Difficulty: Medium
- Skills required: Rust, C
- Expected Project size: 175 hours
- Description: We currently have several Xline client implementations in different languages. We want to provide a C SDK to make Xline even more accessible. The client needs to implement all the current Xline APIs.
- Expected Outcome:
  - Implement Curp protocol client in C.
  - Implement Xline client in C.
  - Write unit tests for Xline C client.
  - Performance benchmark for the client.
  - Write docs for Xline C client.
- Possible mentors: Shi Jicheng, Guan Yu

### Joint consensus correctness testing

- Difficulty: Hard
- Skills required: Rust, Knowledge to consensus algorithms and chaos engineering
- Expected Project size: 350 hours
- Description: We have implemented joint consensus in Xline, which allows for arbitrary configuration changes. The joint consensus is more complex than single-server membership change and we want to add integration and chaos tests to verify the correctness of our implementation.
- Expected Outcome:
  - Write Integration tests.
  - Write Chaos testing.
  - Find and fix possible bugs.
- Possible mentors: Guan Yu, Zhao Jiawei

### Implementing Chaos testing in Madsim

- Difficulty: Hard
- Skills required: Rust, [Jepsen](https://github.com/jepsen-io/jepsen), Knowledge of chaos engineering and deterministic simulation
- Expected Project size: 350 hours
  - Description: Jepsen is a widely-used framework for verifying distributed systems. Although Jepsen is effective at finding issues within a system, it lacks determinism in its testing methodology, making the debugging process more difficult. On the other hand, [Madsim](https://github.com/madsim-rs/madsim) is a deterministic simulator designed for distributed systems, offering fault injection capabilities. Our goal is to combine the strengths of Madsim and Jepsen, creating a lightweight framework for chaos testing within a single-machine environment. With its deterministic nature, this framework allows for reproducible tests and facilitates the debugging process.
- Expected Outcome:
  - Write operations/faults generators under the Madsim framework.
  - Write a linearizability checker in Rust, similar to [Knossos](https://github.com/jepsen-io/knossos).
  - Write a transactional safety checker in Rust, similar to [Elle](https://github.com/jepsen-io/elle).
  - Setup chaos testing using these components.
- Possible mentors: Yin Zhenghao, Shi Jicheng

## Communication

Discord will serve as the primary communication platform during this year’s GSoC program. This includes the following:

- Communicating with your mentor
- Participating in meetings
  It’s also worth mentioning that our Discord server is not created solely for the GSoC program; it is also used as our regular project channel. This ensures all contributors are aware of the progress of the project and offer suggestions and advice. While you will be assigned a mentor, but the entire community is available to help you with any problems you may face.
  Please make sure to read the server’s rules before participating. Be specific when asking questions so that everyone can understand. We will respond as soon as we are available and able to assist you with your questions.
  Use English for communication is a mandatory requirement as we rely on it for effective collaboration.
  Invite link to our server: https://discord.com/invite/hqDRtYkWzm

## Expectations

### Weekly working hours

For the GSoC project labeled **"hard"**, you are expected to work at least 40 hours a week. For medium and easy tasks, you may choose your own working hours, but please communicate with your mentor in advance and make sure to keep on schedule.

### Self-motivation

Our program requires self-motivation, as it involves individual research, problem solving, and coding efforts. While mentor support is available, the majority of the project’s success hinges on your own self-motivation and dedication.

### Frequent communication with mentor

Regular communication with your mentor is essential. They need to be constantly updated about your progress, your plans, obstacles faced, and how you overcame them or if you’re stuck.
Before starting the project, establish a communication schedule for interactions with your mentor.

### Design documents

We expect you to maintain a design document for the project. It should includes your project plan, issues and technical specifications. Your design document will be reviewed by your mentor before starting the actual coding.

## Resources

### Learning materials

Mentors will provide project-specific tutorials, documentation and research articles to makes sure that you understand the project’s framework.

### Development environment

Development in our project can be resource-intensive. If you struggle with coding and benchmarking on your local machine, you can get an account and perform your work on our shared Linux server.

## Contributor Guidance

### Application Process

1. Read the links and instructions given on this site and choose one or more ideas.
2. Join our Discord server: https://discord.com/invite/hqDRtYkWzm . We provide a dedicated channel for the GSoC program.
3. Talk with your prospective mentor for the chosen project in the Discord server.
4. Submit the application/proposal including all requirements at the Google Summer of Code Site before deadline.

## What goes in an application?

Please provide the following information in your application:

1. Your brief CV including contact information.
2. Answers to the following questions:

- What do you find most attractive about our program and the reason you choose us?
- How does your current skills match with the requirements of our program?
- What do you expect to gain from this program and how can we get the best out of you?
- Have you ever participated in GSoC (or a similar program) before?

3.Information about your **proposed project, which includes a detailed and weekly schedule with breakdowns and clear milestones**
