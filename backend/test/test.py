def test_registration_user():
    '''Test if the registration for a single user is working properly'''
    user=USER('example@gmail.com','Password123')
    assert user.email=='example@gmail.com'
    assert user.hashed_password!='Password123'
    assert user.role=='user'

def test_registration_multiple_users():
    '''Test that the hashed_passwords for different users are different'''
    user1=USER('example1@gmail.com','Password')
    user2=USER('example2@gmail.com','Password')
    user3=USER('example3@gmail.com','PasswordTest')
    assert user1.hashed_password!=user3.hashed_password
    assert user1.hashed_password!=user2.hashed_password
