fragment FindGod on GodType {
  name
  id
}

fragment FindAbode on AbodeType {
  name
  id
  coordinates
}

fragment FindEmblem on EmblemType {
  name
  id
}


query fetchGods{
  gods {
   ...FindGod
    emblems {
      id
      name
    }
    abode {
      ...FindAbode
    }
  }
}

query fetchGodRelatives {
  gods {
   ...FindGod
    parents {
    	...FindGod
    }
    children {
    	...FindGod
    }
    siblings {
      ...FindGod
    }
  }
}

query fetchGod {
  god(id: "5c98e94dd5a3ca0de10a1501") {
    ...FindGod
    type
    description
    domains
    abode {
      ...FindAbode
    }
    emblems {
     ...FindEmblem
    }
    parents {
      ...FindGod
      children {
        ...FindGod
      }
    }
    children {
     ...FindGod
    }
    siblings {
     ...FindGod
    }
  }
}

query fetchEmblems {
  emblems {
    ...FindEmblem
    gods {
    	...FindGod
  	}
  }
}

query fetchEmblem {
  emblem(id: "5c98e9ded5a3ca0de10a1507") {
    ...FindEmblem
    gods {
     ...FindGod
    }
  }
}

query fetchAbodes {
  abodes {
    ...FindAbode
    gods {
      ...FindGod
    }
  }
}

query fetchAbode {
  abode(id: "5c98eae6d5a3ca0de10a151b") {
   ...FindAbode
    gods {
      ...FindGod
      description
    }
	}
}

mutation createGod {
  newGod(name: "Kratom", type: "Powdery", description: "Ooh kratora, ooh ooh kratora!") {
    ...FindGod
    type
    description
  }
}

mutation removeGod {
   deleteGod(id: "60525ea4f66b18d51c9a8d9b") {
   ...FindGod
  }
}

mutation editGod {
  updateGod(id: "5c98e94dd5a3ca0de10a1501", name: "Cronus", type: "goddamn god") {
   ...FindGod
    type
    description
  }
}

mutation addDomain {
  addGodDomain(godId: "5c98e94dd5a3ca0de10a1501", domain: "The Cellar") {
    ...FindGod
  }
}

mutation removeDomain {
  removeGodDomain(godId: "5c98e94dd5a3ca0de10a1501", domain: "The Cellar") {
    ...FindGod
  }
}

mutation modifyRelatives {
  addGodRelative(godId: "5c98ecb2d5a3ca0de10a1554", relativeId: "5c98edc9d5a3ca0de10a1566", relationship: "child") {
    name
    parents {
      ...FindGod
    }
    children {
     ...FindGod
      parents {
        name
      }
    }
    siblings {
      ...FindGod
    }
  }

    removeGodRelative(godId: "5c98ea9bd5a3ca0de10a151a", relativeId: "5c98ecb2d5a3ca0de10a1554", relationship: "sibling") {
    name
    id
    parents {
      ...FindGod
    }
    children {
     ...FindGod
    }
    siblings {
      ...FindGod
    }
  }
}

mutation createAbode {
  newAbode(name: "The Toilet", coordinates: "26°09′41″S 23°11′37″W ") {
    ...FindAbode
  }
}

mutation removeAbode {
  deleteAbode(id: "605368beb95c22545e72253f") {
    ...FindAbode
  }
}

mutation editAbode {
  updateAbode(id: "60536ac395010a569e44e180", name: "Toilet") {
    ...FindAbode
  }
}

mutation createEmblem {
  newEmblem(name: "Spoon") {
    ...FindEmblem
  }
}

mutation removeEmblem {
  deleteEmblem(id: "605361ea3530363f2358cd1c") {
    ...FindEmblem
  }
}

mutation editEmblem {
  updateEmblem(id: "60536ac795010a569e44e181", name: "SpoonMan") {
    ...FindEmblem
  }
}