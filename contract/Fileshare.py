import smartpy as sp

class Fileshare(sp.Contract):
    def __init__(self):
        self.init(
            complaint=sp.big_map(tkey=sp.TNat, tvalue=sp.TRecord(address = sp.TAddress, string=sp.TString)),
            complaint_nu=sp.nat(1)
        )
        
    @sp.entry_point
    def add(self, url): 
        sp.set_type(url, sp.TString)
        data = sp.record(address = sp.sender, string = url)
        self.data.complaint[self.data.complaint_nu] = data
        self.data.complaint_nu += 1
     
    @sp.entry_point
    def alias(self):
        self.data.complaint
        
@sp.add_test(name="main")
def test():
    scenario = sp.test_scenario()
    # Test account
    shreyas = sp.test_account("shreyas")
    
    file = Fileshare()
    scenario += file

    scenario += file.add("https://cedro.finance/").run(sender=shreyas)
    scenario += file.add("https://cedro.finance/").run(sender=shreyas)
    scenario += file.add("https://cedro.finance/").run(sender=shreyas)
