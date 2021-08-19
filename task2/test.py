import csv
import json
# grade
# with open('gradedata.csv', newline='') as gradeData:
#     spamreader = csv.reader(gradeData, delimiter=' ', quotechar='|')
#     for row in spamreader:
#         print(', '.join(row))
# # location
# with open('locationdata.csv', newline='') as locationData:
#     spamreader = csv.reader(locationData, delimiter=' ', quotechar='|')
#     for row in spamreader:
#         print(', '.join(row))
# # vendor
# with open('vendordata.csv', newline='') as vendorData:
#     spamreader = csv.reader(vendorData, delimiter=' ', quotechar='|')
#     for row in spamreader:
#         print(', '.join(row))

# def writer(fileName,data,fieldNames):
#     with open(fileName, 'w', newline='') as csvfile:
#         writer = csv.DictWriter(csvfile, fieldnames=fieldNames)
#         writer.writeheader(fieldNames)
#     for item in data:
#         writer.writerow(item)

def findDetails(grade,location):
    ansLi= []

    with open('vendordata.csv', newline='') as vendorData:
        spamreader = csv.DictReader(vendorData)
        for row in spamreader:
            if row["location"] == location:
                # print(json.loads(row["listings"]))
                tempLi = []
                for listing in json.loads(row["listings"]):
                    # print(listing)
                    if listing["gradeNumber"] == grade:
                        tempLi.append(listing)
                if len(tempLi) != 0: 
                    row["listings"] = tempLi
                    ansLi.append(row["name"])
    # writer("op.csv",ansLi,)
    print(ansLi)
findDetails("F2001S","5c8b5781f7eb11385f2c00ee")
