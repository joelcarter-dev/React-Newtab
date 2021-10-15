const Search = require("./Search")

// @ponicode
describe("handleChange", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["George", "Anas", "George"], ["Anas", "Anas", "Jean-Philippe"], ["George", "Edmond", "George"]]
        inst = new Search.Search(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.handleChange({ target: { value: "Elio" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.handleChange({ target: { value: "elio@example.com" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.handleChange({ target: { value: "Dillenberg" } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.handleChange(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("submitSearch", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Edmond", "Michael", "Michael"], ["Michael", "Anas", "Anas"], ["Pierre Edouard", "Michael", "Jean-Philippe"]]
        inst = new Search.Search(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.submitSearch({ target: { value: "elio@example.com" }, preventDefault: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.submitSearch({ target: { value: "Elio" }, preventDefault: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.submitSearch({ target: { value: "Dillenberg" }, preventDefault: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.submitSearch({ target: { value: "elio@example.com" }, preventDefault: () => true })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.submitSearch({ target: { value: "Elio" }, preventDefault: () => false })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.submitSearch(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("selectSearch", () => {
    let object
    let inst

    beforeEach(() => {
        object = [["Edmond", "Pierre Edouard", "Anas"], ["Anas", "Jean-Philippe", "Pierre Edouard"], ["Michael", "Edmond", "Michael"]]
        inst = new Search.Search(object)
    })

    test("0", () => {
        let callFunction = () => {
            inst.selectSearch({ url: "http://www.croplands.org/account/confirm?t=" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            inst.selectSearch({ url: "http://base.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            inst.selectSearch({ url: "Www.GooGle.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            inst.selectSearch({ url: "http://www.example.com/route/123?foo=bar" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction = () => {
            inst.selectSearch({ url: "www.google.com" })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction = () => {
            inst.selectSearch(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})
