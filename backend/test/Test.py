import sys
sys.append("..")
import AuthTest
import DeckTest
import CardTest
import unittest

if __name__=="__main__":
  AuthTest.TestApp(unittest.TestCase)
  DeckTest.TestApp(unittest.TestCase)
  CardTest.TestApp(unittest.TestCase)
  unittest.main()
