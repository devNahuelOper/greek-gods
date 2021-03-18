fragment FindGod on GodType {
  name
  id
}

fragment FindAbode on AbodeType {
  name
  id
  coordinates
}


query fetchGods{
  gods {
    id
    name
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
    id
    name
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
    id
    name
    type
    description
    domains,
    abode {
      name
    }
    emblems {
      id
      name
    }
    parents {
      id
      name
      children {
        name
      }
    }
    children {
      id
      name
    }
    siblings {
      id
      name
    }
  }
}

query fetchEmblems {
  emblems {
    id
    name
    gods {
      id
      name
    }
  }
}

query fetchEmblem {
  emblem(id: "5c98e9ded5a3ca0de10a1507") {
    name
    gods {
      id
      name
    }
  }
}

query fetchAbodes {
  abodes {
    id
    name
    coordinates 
    gods {
      id
      name
    }
  }
}

query fetchAbode {
  abode(id: "5c98eae6d5a3ca0de10a151b") {
    id
    name
    coordinates
    gods {
      id
      name
      description
    }
	}
}

mutation createGod {
  newGod(name: "Kratom", type: "Powdery", description: "Ooh kratora, ooh ooh kratora!") {
    id
    name
    type
    description
  }
}

mutation removeGod {
   deleteGod(id: "60525ea4f66b18d51c9a8d9b") {
    id
    name
  }
}

mutation editGod {
  updateGod(id: "5c98e94dd5a3ca0de10a1501", name: "Cronus", type: "goddamn god") {
    id
    name
    type
    description
  }
}

mutation modifyRelatives {
  addGodRelative(godId: "5c98f221d5a3ca0de10a15d3", relativeId: "5c98ef16d5a3ca0de10a157b", relationship: "child") {
    name
    parents {
      name
      id
    }
    children {
      name
      id
      parents {
        name
      }
    }
    siblings {
      name
      id
    }
  }
}