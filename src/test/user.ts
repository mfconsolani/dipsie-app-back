import mongoose from 'mongoose'


export const userAdmin = {
  username: "Pepin",
  email: process.env.TEST_USER,
  role: [],
  candidates: [
		{
			"_id" : new mongoose.Types.ObjectId,
			"candidateName" : "1",
			"candidateId" : 1,
			"candidateInfo" : [
				{
          "_id" : new mongoose.Types.ObjectId,
					"currentSituation" : "1",
					"motivationToChange" : "1",
					"freelanceOrPerm" : "1",
					"intermediaries" : "1",
					"yearsInSap" : "1",
					"coreModule" : "1",
					"fullCycleImp" : "1",
					"hanaExperience" : "1",
					"referencias" : "false",
					"englishLevel" : "1",
					"dailyRate" : "1",
					"availability" : "1",
					"interviewAvail" : "1",
					"otherProcess" : "1",
					"counteroffer" : "1",
					"fullname" : "1",
					"birthday" : "1",
					"permInAccenture" : "1",
					"otherProvider" : "1",
					"postSavingDate" : Date.now()
				}
			],
			"availableNow" : false,
			"mainSkills" : "1"
		}
	]
}


export const candidateThree = {
    candidate: '3',
    id: '3',
    info: {
      currentSituation: '3',
      motivationToChange: '3',
      freelanceOrPerm: '3',
      intermediaries: '3',
      yearsInSap: '3',
      coreModule: '3',
      fullCycleImp: '3',
      hanaExperience: '3',
      referencias: 'false',
      englishLevel: '3',
      dailyRate: '3',
      availability: '3',
      interviewAvail: '3',
      otherProcess: '3',
      counteroffer: '3',
      fullname: '3',
      birthday: '3',
      permInAccenture: '3',
      otherProvider: '3'
    },
    availableNow: 'false',
    mainSkills: '3'
  }