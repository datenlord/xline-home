Few can argue against the need for quality control when developing software. Any known or unknown software defects can be very costly for the users of the software. Testing can help developers identify these software defects in advance. The sooner development teams receive feedback from testing, the sooner they can address issues such as:

- Architectural flaws
- Poor design decisions
- Invalid or incorrect functionality
- Security vulnerabilites
- Scalability issues

Xline, as a distributed key-value store engine, is designed to run in the presence of many failure scenarios and degraded states, which greatly increases the testing surface. These states also must be tested in addition to the normal testing done on a project.

In futher sections we’ll investigate how to test distributed systems under the influence of these almost infinite variables. For now, let's examine the basics that every project requires. These simple tests will lay the foundation for many later tests that can be run millions of times throughout the life of a project.

Often, these tests are written before or alongside the code which they test, and they're used to guide the development process.

# Unit Testing

Unit testing is a software development process in which the smallest testable parts of an application, called units, are individually and independently scrutinized for proper operation. This testing methodology is done during the development process by the software developers and sometimes QA staff.

Xline includes many unit tests that run by cargo test. These tests typically involve simple functionality and are tested using assertions. Many languages, like Rust, offer built-in unit testing functionality:

~~~rust
#[test]
fn test_parse_members() {
    let s1 = "";
    assert!(parse_members(s1).is_err());
    let s2 = "a=1";
    let m2 = HashMap::from_iter(vec![("a".to_owned(), "1".to_owned())]);
    assert_eq!(parse_members(s2).unwrap(), m2);

    let s3 = "a=1,b=2,c=3";
    let m3 = HashMap::from_iter(vec![
        ("a".to_owned(), "1".to_owned()),
        ("b".to_owned(), "2".to_owned()),
        ("c".to_owned(), "3".to_owned()),
    ]);
    assert_eq!(parse_members(s3).unwrap(), m3);
    let s4 = "abcde";
    assert!(parse_members(s4).is_err());
}
~~~

The main objective of unit testing is to isolate written code to test and determine if it works as intended.

# Mock Testing

Doing testing is essentially a way to test system or component in a controlled environment. The biggest problem with having a lot of reliance on third-party code is that the third-party code is not controllable. So we need to isolate the tested code and replace the uncontrollable component with a controllable one. That's a so-called mock test.

mockall is a powerful mock object library for Rust. It provides tools to create mock versions of almost any trait or struct. They can be used in unit tests as a stand-in for the real object. We use mockall to do some mock tests in Xline:

~~~rust
#[traced_test]
#[tokio::test]
async fn logs_will_be_resent() {
    let state = new_test_state();

    let mut mock_connect = MockConnectInterface::default();
    mock_connect
        .expect_append_entries()
        .times(4)
        .returning(|_, _| Err(ProposeError::RpcStatus("timeout".to_owned())));
    mock_connect
        .expect_id()
        .return_const(FOLLOWER_ID1.to_owned());

    let handle = tokio::spawn(async move {
        let req = AppendEntriesRequest::new(
            1,
            LEADER_ID.to_owned(),
            0,
            0,
            vec![LogEntry::new(1, &[Arc::new(TestCommand::default())])],
            0,
        )
        .unwrap();
        send_log_until_succeed(1, req, Arc::new(mock_connect), state).await;
    });
    sleep_secs(3).await;
    assert!(!handle.is_finished());
    handle.abort();
}
~~~

Read the [mock document](https://docs.rs/mockall/0.11.3/mockall/) for more information.

# Integration Testing

ntegration tests are often used to ensure that software components or functions operate together properly.

In Rust, integration tests are entirely external to your library and use your code in the same way any other external code would, using only the public interface and potentially exercising multiple modules per test. It can also exist as documentation. That means it's possible to document your project and benefit from a full test suite simultaneously.

~~~rust
/// Create a new Xline Server instance with the given config
///
/// ```rust
/// let config = if let Ok(path) = env::var("XLINE_SERVER_CONFIG") {
///         fs::read_to_string(&path).await?
///     } else {
///         include_str!("/etc/xline/xline_server.conf").to_owned()
///     };
/// let xline_server = XlineServer::new(config)?;
/// ```
struct XlineServer { /*...*/ }
~~~

The [Rust Book](https://doc.rust-lang.org/book/ch11-01-writing-tests.html) has a great chapter on how to write tests in Rust, and which testing strategies are appropriate for which problems.

# Validation Testing

Since one of the design goals of Xline is to be fully compatible with the etcd API, the validation test is mainly used to test the compatibility of the Xline interface with the etcd client. We used etcdctl to test the compatibility.

Read the "[Start Xline Servers](https://github.com/datenlord/Xline/blob/master/QUICK_START.md#start-xline-servers)" and "[Send Etcd requests](https://github.com/datenlord/Xline/blob/master/QUICK_START.md#send-etcd-requests)" for more information.

Read the etcdctl doc for more detail about how to use etcdctl

Click [here](https://datenlord.feishu.cn/sheets/shtcnTuzElmgDO6NMOlobsCG2Jd) to view the test report.