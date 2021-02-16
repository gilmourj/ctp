#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Feb 16 10:34:10 2021

@author: Gilmourj
"""
import pandas as pd
import requests
from datetime import datetime, timezone
from pytz import timezone as tz

def de():
    df = pd.read_csv('https://myhealthycommunity.dhss.delaware.gov/locations/state/download_covid_19_data')
    df = df[df['Unit'] == 'tests'].set_index(['Year', 'Month', 'Day']).sort_index()
    towrite = df.loc[df.index.unique()[-3]][['Statistic', 'Value']]
    towrite['date'] = datetime.now()
    try: 
        data = pd.read_csv('data/DE.csv')
        frames = [data, towrite]
        de = pd.concat(frames)
    except Exception:
        de = towrite
    de.to_csv('data/DE.csv', index=False) 

def hi():
    hi = pd.read_csv("https://public.tableau.com/views/EpiCurveApr4/CSVDownload.csv?:showVizHome=no")
    #print(hi.select_dtypes(exclude=['object']).sum())
    towrite = hi.select_dtypes(exclude=['object']).sum()
    
    # HI updated time
    res = requests.get("https://services9.arcgis.com/aKxrz4vDVjfUwBWJ/arcgis/rest/services/HIEMA_TEST_DATA_PUBLIC_LATEST/FeatureServer/0/query?where=name%3D'State'&returnGeometry=false&outFields=*&orderByFields=reportdt desc&resultOffset=0&resultRecordCount=1&f=json")
    updated = datetime.fromtimestamp(res.json()['features'][0]['attributes']['reportdt']/1000) # because ms
    # format we want: 12/27/2020 8:30:00
    #print("\nUpdate time: ", updated.replace(tzinfo=timezone.utc).astimezone(tz=tz("Pacific/Honolulu")).strftime("%m/%d/%Y %H:%M:%S"))
    towrite['update time'] = updated.replace(tzinfo=timezone.utc).astimezone(tz=tz("Pacific/Honolulu")).strftime("%m/%d/%Y %H:%M:%S")
    try: 
        data = pd.read_csv('data/HI.csv')
        frames = [data, towrite]
        hi = pd.concat(frames)
    except Exception:
        hi = towrite
    hi.to_csv('data/HI.csv') 
    
    # f = open("hi.txt", "a")
    # f.write(("\nUpdate time: " + updated.replace(tzinfo=timezone.utc).astimezone(tz=tz("Pacific/Honolulu")).strftime("%m/%d/%Y %H:%M:%S")))
    # f.write(hi.select_dtypes(exclude=['object']).sum())

def main():
    de()
    hi()

if __name__ == "__main__":
    main()