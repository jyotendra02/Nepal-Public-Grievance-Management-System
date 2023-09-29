import smartpy as sp

class Fileshare(sp.Contract):
    def __init__(self):
        self.init(
            user  = sp.big_map(tkey=sp.TAddress,tvalue=sp.TMap(sp.TNat,sp.TString))  
        )
        
    @sp.entry_point
    def add_user(self, url):      
        if self.data.user.contains(sp.sender):
            my_list = self.data.user[sp.sender]
            my_list[sp.len(my_list)] = url
            self.data.user[sp.sender]=my_list
        else:
            self.data.user[sp.sender] = {0: url}
        
@sp.add_test(name="main")
def test():
    scenario = sp.test_scenario()
    #test account
    shreyas = sp.test_account("shreyas")
    jyotendra = sp.test_account("jyotendra")
    ojas = sp.test_account("ojas")
    harsh = sp.test_account("harsh")
    
    file = Fileshare()
    scenario += file
    scenario.h1("Chal Hatt Be Sale")

    scenario += file.add_user("abc").run(sender = shreyas)
