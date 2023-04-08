# CoWid Australian Lockdown information

There is no Australia wide state-specific lockdown API. But Australia has a [government site](https://www.australia.gov.au) which does link out. 

Unfortunately each state has a different website and format which makes it difficult to use one site for all information.

### ACT: https://www.covid19.act.gov.au/
* Has a banner to tell that ACT is currently in lockdown
* Simple site with bright, clear notification on lockdown dates and rules

### NSW: https://www.nsw.gov.au/covid-19/rules
* Difficult to see immediately where/when lockdown ends
* Each region in NSW has different lockdown rules
* You must find the lockdown date somewhere else because the NSW site is almost impossible to navigate and find useful up to date information.
    * 10th Sept for regional
    * End of Sept for greater Sydney 

### VIC: https://www.coronavirus.vic.gov.au/
* Has a banner to tell that VIC is currently in lockdown
* There is no end date for lockdown

## Conclusion

As an API cannot be found, it seems like the information needs to be manually updated. At least for NSW. For ACT and VIC it seems ok to be able to scour the site for banner information possibly.

The original idea was to have a calendar showing lockdown dates and information. Since that’s not feasible, new idea is to have a state selector then showing whether that state is in lockdown today or not and what the rules are.