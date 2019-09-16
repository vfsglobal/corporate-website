/*jshint multistr: true */

(function ($) {
  "use strict";

  vfs.data = {
    //used for google analytics to track that current website is of english language by language code
    language_iso_code: "en",

    //used for choosing active section if general page is shown (common to both individuals and governments)
    //e.g. go to disclaimer from individuals it shows url as https://www.vfsglobal.com/en/general/disclaimer.html?from_section=0 which means section query param will be used from here
    section_query_param_name: "from_section",

    //title of each page will be used as per breadcrumb so title prefix for that will be taken from here
    //e.g. go to About from Individuals title would be "VFS Global | For Individuals | About"
    default_title_prefix: "VFS Global",

    //to replace strong or bold content with <span class="bold (replace_with_class)">...</span>. Since strong/b tag changes font-weight which creates blurry text on custom font (like InterUI), script replace it with class where font-family: InterUI-Bold is given.
    replace_bold: {
      check_font_family: "InterUI, sans-serif",
      replace_with_class: "bold"
    },

    //to prevent default browser based bookmark behaviour with custom animated scrolling bookmark behaviour; scroll animation duration will be taken from here
    bookmark_scroll_duration: 700,

    //used for adding google tag manager js link in all pages
    google_tag_manager: {
      gtm_js_id: "GTM-P9Q5746"
    },

    //since this website didn't uses bootstrap; it has custom script for grid system.
    //how much column to show will be taken from here; for detailed info about this read Documentation's "Grid System"
    dynamic_columns: {
      column_options: {
        stats_col5_details: {
          "5": function () {
            return vfs.details.window_dimension.width >= 680;
          },
          "3": function () {
            return vfs.details.window_dimension.width < 680;
          }
        },
        steps_col3_details: {
          "3": function () {
            return vfs.details.window_dimension.width > 960;
          },
          "1": function () {
            return vfs.details.window_dimension.width <= 960;
          }
        },
        stats_col3_details: {
          "3": function () {
            return true;
          }
        },
        col3_details: {
          "3": function () {
            return vfs.details.window_dimension.width > 720;
          },
          "1": function () {
            return vfs.details.window_dimension.width <= 720;
          }
        },
        col2_details: {
          "2": function () {
            return vfs.details.window_dimension.width > 480;
          },
          "1": function () {
            return vfs.details.window_dimension.width <= 480;
          }
        },
        image_info_col3_details: {
          "3": function () {
            return vfs.details.window_dimension.width > 768;
          },
          "2": function () {
            return (
              vfs.details.window_dimension.width <= 768 &&
              vfs.details.window_dimension.width > 480
            );
          },
          "1": function () {
            return vfs.details.window_dimension.width <= 480;
          }
        },
        key_benefits_col2_details: {
          "2": function () {
            return vfs.details.window_dimension.width >= 720;
          },
          "1": function () {
            return vfs.details.window_dimension.width < 720;
          }
        },
        main_footer_links: {
          "2": function () {
            return vfs.details.window_dimension.width >= 1200;
          },
          "1": function () {
            return vfs.details.window_dimension.width < 1200;
          }
        },
        many_links_col_details: {
          "2": function () {
            return (
              vfs.details.window_dimension.width >= 1200 ||
              (vfs.details.window_dimension.width < 960 &&
                vfs.details.window_dimension.width >= 580)
            );
          },
          "3": function () {
            return (
              vfs.details.window_dimension.width < 1200 &&
              vfs.details.window_dimension.width >= 960
            );
          },
          "1": function () {
            return vfs.details.window_dimension.width < 580;
          }
        },
        parent_few_links_col_details: {
          "2": function () {
            return vfs.details.window_dimension.width >= 1200;
          },
          "1": function () {
            return vfs.details.window_dimension.width < 1200;
          }
        },
        few_links_col_details: {
          "1": function () {
            return (
              vfs.details.window_dimension.width >= 1200 ||
              vfs.details.window_dimension.width < 480
            );
          },
          "3": function () {
            return (
              vfs.details.window_dimension.width < 1200 &&
              vfs.details.window_dimension.width >= 960
            );
          },
          "2": function () {
            return (
              vfs.details.window_dimension.width < 960 &&
              vfs.details.window_dimension.width >= 480
            );
          }
        },
        other_service_boxes: {
          "4": function () {
            return vfs.details.window_dimension.width >= 960;
          },
          "3": function () {
            return (
              vfs.details.window_dimension.width < 960 &&
              vfs.details.window_dimension.width >= 600
            );
          },
          "2": function () {
            return (
              vfs.details.window_dimension.width < 600 &&
              vfs.details.window_dimension.width >= 480
            );
          },
          "1": function () {
            return vfs.details.window_dimension.width < 480;
          }
        }
      },
      extra_classes: {}
    },

    //Options for Carousel used in showing Other Info Boxes (like Other Posts, Other Board Members, Other Solutions) and Tab Buttons in Individuals Home Page. (library used Owl Carousel 2)
    //Key is selector and value is an object contains options (see owl carousel 2 website documentation for detailed list of options) and events (we have added custom event "all_images_loaded" (will be called when all images will be loaded) along with plugin's event, see owl carousel 2 website documentation for detailed list of events)
    //Important Note: Dont download original Owl Carousel library since we have changed owl-carousel.js to solve error for autoWidth enabled carousel used in tab buttons
    all_owl_carousel: {
      ".other_info_box_carousel": {
        options: {
          items: 1,
          smartSpeed: 700,
          margin: 20,
          nav: true,
          navClass: ["owl-prev icon-arrow-right", "owl-next icon-arrow-right"],
          navText: ["", ""],
          dots: false,
          responsive: {
            768: {
              items: 3
            },
            520: {
              items: 2
            }
          }
        }
      },
      ".tab_container .button_list": {
        options: {
          autoWidth: true,
          pullDrag: false,
          nav: true,
          navText: ["", ""],
          navClass: ["owl-prev icon-left-thin-arrow", "owl-next icon-left-thin-arrow"],
          dots: false
        }
      }
    },

    //all the content of news section is provided here (when creating new version see Documentation > Enhancements to optimize it and to reduce size)
    all_content_details: {
      media_releases: {
        //number of media release news to show at start in page (currently showing 5 news as given here)
        show_at_start: 5,
        //all media release news must have pdf file; below is given base path of folder which contains all media release PDF files.
        base_pdf_path: "../PDF/media-releases/",
        //content is shown year wise as provided below
        content_details: [
          {
            year: "2019",
            content: [
              {
                html: "VFS Global’ s Saudization Initiative Surpasses 50%; Aims to Exceed 60% by 2020",
                pdf: "VFS-Global-Saudiazation.pdf",
                //give show_on_latest: true if you want to show current news in "Latest News" section
                show_on_latest: true
              },
              {
                html: "Dantata Universal Services Nigeria Ltd. (DUS) in partnership with VFS Global open National Identification Number enrolment centre in Ghana",
                pdf: "Press-release-Accra.pdf"
              },
              {
                html: "VFS Global inaugurates its first National Identification Number enrolment centre for the Nigerian Nationals in India",
                pdf: "NIN-centre-launched-in-Delhi.pdf"
              },
              {
                html: "National Identification Number enrolment centre opens for Nigerians residing in the Kingdom of Saudi Arabia",
                pdf: "KSA-national-identification-number-enrolment-centre.pdf"
              },
              {
                html: "Ministry of Foreign Affairs of Georgia enhances co-operation with VFS Global - introducing eVisa solution for travellers from India",
                pdf: "Georgia-vfs-global-press-release.pdf"
              },
              {
                html: "VFS Global launches France Visa Application Centre in Singapore",
                pdf: "France-vacpr1.pdf"
              },
              {
                html: "VFS Global processes its 200 millionth application, up from 100 million applications in just four years",
                pdf: "vfs-global-200million.pdf"
              },
              {
                html: "VFS Global launches second Chinese Visa Application Service Center in Egypt",
                pdf: "China-in-alexandria-press-release.pdf"
              },
              {
                html: "VFS Global inaugurates National Identification Number enrolment centre for Nigerian residents in the UAE",
                pdf: "Nigeria.pdf"
              },
              {
                html: "VFS Global unveils new and more spacious Premium Lounge in Chennai",
                pdf: "VFS-Global-unveils-spacious-Premium-Lounge-in-Chennai.pdf"
              },
              {
                html: "Dantata Universal Services Nigeria Ltd. (DUS) in partnership with VFS Global flag up its first-ever National Identification Number enrolment centre for the Nigerian diaspora.",
                pdf: "NIMC-press-release.pdf"
              },
              {
                html: "VFS Global opens Italia Tourist Information Centre in Bahrain",
                pdf: "italia-tourist-info.pdf"
              },
              {
                html: "Bulgaria visa services now available across P.R. China",
                pdf: "Bulgaria-visa.pdf"
              },
              {
                html: "Identity and Citizen Services (ICS) a key driver growth at VFS Global ",
                pdf: "Africa.pdf"
              },
              {
                html: "VFS Global launches exclusive Netherlands Passport and ID Services Centre in Canada",
                pdf: "Canada.pdf"
              },
              {
                html: "VFS Global CEO Zubin Karkaria honoured with Global Game Changers Award at The Indian Awards in London",
                pdf: "ZUBIN.pdf"
              },
              {
                html: "Slovakia Visa Application Centre inaugurated in Bengaluru ",
                pdf: "inaugurated-in-Bengaluru.pdf"
              },
              {
                html: "VFS Global volunteers in UAE celebrate the month of giving",
                pdf: "Iftar.pdf"
              },
              {
                html: "The Italian Embassy launches Casa Italia at VFS Global in New Delhi",
                pdf: "CASA.pdf"
              },
              {
                html: "VFS Global wins contracts to provide Italy visa services in three new countries; re-awarded contracts for six",
                pdf: "Italy.pdf"
              },
              {
                html: "VFS Global announces extended Ramadan timings for the convenience of visa applicants",
                pdf: "Extended-Ramadan-Timings.pdf"
              },
              {
                html: "New Visa Application Centres open in Riyadh, Al Khobar and Jeddah for visas to Ireland",
                pdf: "Centres-open-to-ireland.pdf"
              },
              {
                html: "New E-Visa and E-Tourist Card service launched for a smarter and faster entry into Suriname",
                pdf: "Suriname.pdf"
              },
              {
                html: "New Germany Visa Application Centre launched in Mongolia for Schengen visa applicants",
                pdf: "release.pdf"
              },
              {
                html: "VFS Global wins the coveted Dubai Quality Global Award (DQGA) and achieves 5 Star Rating in the Emirates Business Rating Scheme (EBRS)",
                pdf: "Award.pdf"
              },
              {
                html: "VFS Global successfully attains the prestigious PCMM Level 5 rating",
                pdf: "PCMM.pdf"
              },
              {
                html:
                  "Slovakia Visa Application Centre inaugurated in New Delhi, India",
                pdf: "Slovak.pdf"
              },
              {
                html:
                  "VFS Global launches exclusive Netherlands Passport and ID Application Centre in the United States of America",
                pdf: "Netherlands-26.pdf"
              },
              {
                html:
                  "First Portugal Visa Application Centre launched in Brazil",
                pdf: "Portugal-in-Sao-Paulo.pdf"
              },
              {
                html:
                  "Now, avail visa services for four popular destinations at the newly opened Joint Visa Application Centre in Bogota",
                pdf: "BOGOTA.pdf"
              },
              {
                html:
                  "VFS Global launched new Joint Visa Application Centre in Moscow",
                pdf: "Moscow_press-release.pdf"
              },
              {
                html:
                  "VFS Global opens Visa Application Centre in Laos for Germany",
                pdf: "LAOS.pdf"
              },
              {
                html:
                  "VFS Global starts operations in Belarus for Thai Embassy",
                pdf: "Belarus.pdf"
              },
              {
                html:
                  "VFS Global CEO Wins Professional Services CEO of the Year Award",
                pdf: "Indian-CEO-Awards-Final-Press-Release.pdf"
              },
              {
                html:
                  "New Visa Application Centre Opens in Al Khobar and Jeddah for Schengen Visas to Belgium",
                pdf: "Belgium-in-KSA-EnglishV3.pdf"
              },
              {
                html:
                  "New Application Centre Opens in Doha for Schengen Visas to the Czech Republic ",
                pdf: "Padiyar.pdf"
              },
              {
                html:
                  "Greece partners with VFS Global to launch Visa Application Centres in the Kingdom of Saudi Arabia and the Sultanate of Oman",
                pdf: "Greece-VAC.pdf"
              },
              {
                html:
                  "Denmark partners with VFS Global to launch its Visa Application Centre in the State of Kuwait",
                pdf: "Kuwait.pdf"
              },
              {
                html:
                  "Immigration Bureau of Thailand and VFS Global introduce new Thailand eVisa service – for a faster and more convenient entry into Thailand",
                pdf: "Thai-eVoA.pdf"
              },
              {
                html:
                  "The Embassy of Greece launches two Visa Application Centres in the Kingdom of Saudi Arabia and one in the Sultanate of Oman, in partnership with VFS Global",
                pdf: "Greece-KSA.pdf"
              },
              {
                html:
                  "Avail Germany visa services in Jakarta now at your doorstep or even outside of normal processing hours",
                pdf: "Germany.pdf"
              },
              {
                html:
                  "VFS Global Visa Application Centre in Bangkok now moves to a spacious and central location",
                pdf: "Bangkok.pdf"
              },
              {
                html:
                  "VFS Global awarded contract to open new Passport Application Centres across four locations in Ghana",
                pdf: "Ghana.pdf"
              },
              {
                html:
                  "First-ever VFS Global Schengen Visa Application Centre launched in Rwanda ",
                pdf: "Kigali.pdf"
              },
              {
                html:
                  "VFS Global launches exclusive Netherlands Passport and ID Application Centre in the United Kingdom",
                pdf: "Netherlands.pdf"
              }
            ]
          },
          {
            year: "2018",
            content: [
              {
                html:
                  "Russia Visa Application Centres launched in 4 cities in India",
                pdf: "Press-release-Russia-in-Delhi-191218.pdf",
                show_on_latest: true
              },
              {
                html:
                  "Italy extends visa services contract; strengthens partnership with VFS Global",
                pdf: "italy-extends.pdf",
                show_on_latest: true
              },
              {
                html:
                  "First Slovakia Visa Application Centre launched in the Middle East in partnership with VFS Global",
                pdf: "first-slovakia-visa-application.pdf"
              },
              {
                html:
                  "VFS Global expands Chinese Visa Application Service Center network in Africa with new launch in Egypt",
                pdf: "vfs-global-extends-china.pdf"
              },
              {
                html:
                  "Jiten Vyas and Vinay Malhotra appointed to VFS Global’s Executive Board",
                pdf: "EB.pdf"
              },
              {
                html:
                  "People’s Republic of China opens Visa Application Center in Kuwait in partnership with VFS Global",
                pdf: "China-VAC-in-Kuwait.pdf"
              },
              {
                html:
                  "Launch of VFS Global Slovakia Visa Application Centres in Belarus",
                pdf: "Slovakia-in-Belarus-press-release.pdf"
              },
              {
                html:
                  "VFS Global launches new Joint Visa Application Centre in Baghdad",
                pdf: "Iraq-JVAC.pdf"
              },
              {
                html:
                  "VFS Global wins global visa contract for the Netherlands",
                pdf: "Press-release-Netherlands-global-271118.pdf"
              },
              {
                html:
                  "Slovakia signs new contract for visa processing services, becomes VFS Global’s 62<sup>nd</sup> client government",
                pdf: "Slovakia-Global-Contract.pdf"
              },
              {
                html:
                  "Embassy of Ireland opens its first Visa Application Centre in Dubai, in partnership with VFS Global",
                pdf: "Final-Ireland-dubai-PR-Nov-1-2018-v-5-(nov1).pdf"
              },
              {
                html:
                  "VFS Global records 34% increase in France visa applications from Puducherry in the first nine months of 2018",
                pdf: "pondicherry.pdf"
              },
              {
                html:
                  "VFS Global signs visa service contracts with eight European Governments",
                pdf: "Global-release.pdf"
              },
              {
                html:
                  "Germany opens a Visa Application Centre in Kuwait in partnership with VFS Global",
                pdf: "german-vac-in-kuwait.pdf"
              },
              {
                html:
                  "Experience comfort and convenience at the new VFS Global Joint Visa Application Centre in Dakar",
                pdf: "Senegal-VAC-relocation.pdf"
              },
              {
                html:
                  "New Thailand Visa Application Centres inaugurated in Taiwan",
                pdf: "thailand-in-taiwan-launch-press-release.pdf"
              },
              {
                html:
                  "Italy Opens a new Visa Application Centre in the Kingdom of Bahrain in partnership with VFS Global",
                pdf: "Press-Release-Italy-in-Bahrain.pdf"
              },
              {
                html: "New China Visa Application Centre launched in Gambia",
                pdf: "China-in-Gambia.pdf"
              },
              {
                html: "New China Visa Application Centre launched in Senegal",
                pdf: "China-in-Senegal.pdf"
              },
              {
                html:
                  "VFS Global Opens New Joint Visa Application Centre in Riyadh",
                pdf: "riyadh-standalone.pdf"
              },
              {
                html: "VFS Global expands Ukraine visa services in Africa ",
                pdf: "ukraine-in-africa.pdf"
              },
              {
                html:
                  "VFS Global Opens Ukraine Visa Application Centres in Riyadh, Jeddah in KSA",
                pdf: "Press-Release-Ukraine-VAC-in-KSA.pdf"
              },
              {
                html:
                  "VFS Global opens first Visa Application Centre for Republic of Sudan in Riyadh, KSA",
                pdf: "Press-Release-Sudan-VAC-in-KSA.pdf"
              },
              {
                html: "New Sweden Visa Application Centre opens in Myanmar",
                pdf: "Swedenin-Myanmar.pdf"
              },
              {
                html:
                  "Ireland opens first Visa Application Centre in Abu Dhabi, UAE, in partnership with VFS Global",
                pdf: "final-ireland-prjun.pdf"
              },
              {
                html:
                  "Exclusive new services for UK student visa applicants in Hong Kong",
                pdf: "UK-student-visa-press-release.pdf"
              },
              {
                html: "VFS Global announces Extended Ramadan Timings",
                pdf: "Media-Release-Ramadan-Advisory.pdf"
              },
              {
                html:
                  "Four new Cyprus Visa Application Centres launched in the United Kingdom",
                pdf: "Cyprus-in-UK-press-release.pdf"
              },
              {
                html:
                  "VFS Global brings UK visa services closer to applicants in Thailand with the launch of its ‘Mobile Visa Application Centre’ solution",
                pdf: "Mobile-Visa-Application-Centre.pdf"
              },
              {
                html:
                  "New China Visa Application Centre launched in       Madagascar to extend footprint in Africa",
                pdf: "Madagascar.pdf"
              },
              {
                html:
                  "VFS Global opens Visa Application Centre in Oman in partnership with German Embassy",
                pdf: "Press-Release-Germany-VAC-in-Oman.pdf"
              },
              {
                html: "German Ambassador opens Visa Application Centre",
                pdf: "press-realease-qatar.pdf"
              },
              {
                html:
                  "VFS Global Launches One-Stop Visa Centres for Malaysia in Riyadh, Jeddah in KSA",
                pdf: "Malaysia.pdf"
              },
              {
                html:
                  "VFS Global expands Finland visa services network to Hong Kong",
                pdf: "Finland-in-HK-press-release.pdf"
              },
              {
                html:
                  "German  Embassy opens Visa Application Centre in Bahrain in partnership with VFS Global",
                pdf: "Manama.pdf"
              },
              {
                html:
                  "VFS Global launches two new visa services for UK visa applicants",
                pdf: "SriLanka.pdf"
              },
              {
                html:
                  "Czech Visa Application Centres launched in Changsha, Jinan, and Fuzhou in P. R. China",
                pdf: "Czech-in-China.pdf"
              },
              {
                html:
                  "Complete your UK visa application process over the phone or email",
                pdf: "PressRelease-UK-In-USA-Formfilling.pdf"
              },
              {
                html:
                  "VFS Global now offers UK visa form filling assistance over the phone or email",
                pdf: "Press-Release-UK-In-Canada-Formfilling.pdf"
              },
              {
                html:
                  "VFS Global awarded contracts to provide Canadian visa application centre services in 78 countries",
                pdf: "Canada-Press-Release.pdf"
              },
              {
                html:
                  "VFS Global acquires Middle Eastern FMC partner Al Etimad",
                pdf: "Al-Etimad-Latest.pdf"
              },
              {
                html: "VFS Global to take over full ownership of VFS TasHeel",
                pdf: "TasHeel-Latest.pdf"
              },
              {
                html:
                  "Visa Application Centre for The Netherlands opens in Ghana",
                pdf: "Netherlands-in-Ghana-press-release.pdf"
              },
              {
                html:
                  "Indian investments in Dubai can now be protected through a Will registration system operated by Dubai’s international commercial courts and supported by VFS Global",
                pdf: "Kochi-Press-Release-DIFC.pdf"
              },
              {
                html: "UK visa services now at your doorstep",
                pdf: "Dhaka.pdf"
              },
              {
                html:
                  "VFS Global further strengthens partnership with the Government of Italy",
                pdf: "Press-Release-Italy-Signing-in-ME-Africa.pdf"
              },
              {
                html:
                  "Cyprus visa services now closer to home for Goa residents",
                pdf: "Press-Release-Cyprus-VAC-in-Goa.pdf"
              },
              {
                html:
                  "Croatia and Lithuania extend their contracts with VFS Global",
                pdf: "Press-Release-Croatia-and-lithuania-contract.pdf"
              },
              {
                html:
                  "VFS Global becomes exclusive service provider to support Estonia’s e-Residency programme in South Korea",
                pdf: "Estonia-e-residency.pdf"
              },
              {
                html:
                  "Latvia Opens New External Visa Centres in UAE in Partnership with VFS Global",
                pdf: "Press-Release-Latvia-in-Abu-Dhabi-Dubai.pdf"
              },
              {
                html:
                  "VFS Global now accepts visa applications for Ukraine in India",
                pdf: "Ukraine-operations-India.pdf"
              },
              {
                html:
                  "Czech Republic Visa Application Centre inaugurated in       Goa",
                pdf: "Press-Release-Czech-in-Goa.pdf"
              },
              {
                html:
                  "VFS Global opens first-ever Schengen Visa Application Centre in Myanmar",
                pdf: "Netherlands-Myanmar.pdf"
              },
              {
                html:
                  "VFS Global to process Germany visas in 10 new countries in Middle East and North Africa",
                pdf: "VFS-Global-process-Germany-visas.pdf"
              }
            ]
          },
          {
            year: "2017",
            content: [
              {
                html: "Visa form-filling assistance now just a phone call away",
                pdf: "Helpline-For-Visa-Form-Filling.pdf",
                show_on_latest: true
              },
              {
                html:
                  "Zubin Karkaria wins 'CEO of the Year' at the Masala! Awards 2017",
                pdf: "CEO-of-the-Year.pdf",
                show_on_latest: true
              },
              {
                html:
                  "VFS Global wins contract to process Norway visa applications in 39 countries",
                pdf: "Norway-Contract.pdf"
              },
              {
                html:
                  "The Czech Republic strengthens promotional activities in the Middle East with road shows in Kuwait and the UAE",
                pdf: "CzechTourism.pdf"
              },
              {
                html:
                  "VFS Global extends network of Italy Visa Application Centres in the Middle East with new launch in Kuwait",
                pdf: "Press-Release-Italy-VAC-in-Kuwait.pdf"
              },
              {
                html:
                  "Cyprus Visa Application Centres now in 16 cities in India",
                pdf: "Press-Release-FINAL-Cyprus-in-India.pdf"
              },
              {
                html:
                  "Finland Visa Application Centres now open in Abu Dhabi and Dubai",
                pdf: "Finland-VAC-launch-Dubai-AbuDhabi.pdf"
              },
              {
                html:
                  "VFS Global signs agreement with House of Justice, Ukraine, to manage property and business registrations",
                pdf: "House-of-Justice-agreement.pdf"
              },
              {
                html:
                  "VFS Global extends network of Chinese Visa Application Centers in the Middle East with new launch in the Republic of Lebanon",
                pdf: "Press-Release-China-VAC-Lebanon.pdf"
              },
              {
                html:
                  "One Stop Centres for Malaysia visa services launched in Abu Dhabi and Dubai",
                pdf: "Press-Release-Malaysia-OSC-in-DubaiAbuDhabi.pdf"
              },
              {
                html: "New Chinese Visa Application Center opens in Algeria",
                pdf: "Press-Release-China-in-Algeria.pdf"
              },
              {
                html:
                  "India Passport and Visa Application Centre launched in Jubail",
                pdf: "India-visa-application-Jubail.pdf"
              },
              {
                html:
                  "Brazil launches new Visa Application Centre in Luanda, in partnership with VFS Global",
                pdf: "Brazil-in-Angola.pdf"
              },
              {
                html:
                  "China Visa Application Centers opened in Abuja and Lagos",
                pdf: "Press-release-FINAL-China-VAC-Nigeria.pdf"
              },
              {
                html:
                  "VFS Global signs 4-year visa processing contract with Embassy of Italy in Kuwait",
                pdf: "Press-Release-Italy-VAC-Signing-in-Kuwait.pdf"
              },
              {
                html:
                  "VFS Global opens first Chinese Visa Application Service Center in the Middle East in Dubai",
                pdf: "Press-releases-english-China-VAC-Dubai.pdf"
              },
              {
                html: "New Japan Visa Application Centre launched in Jakarta",
                pdf: "Press-Release-draft-Japan-in-indonesia-eng-final.pdf"
              },
              {
                html: "VFS Global acquires visa service provider TT Services",
                pdf: "Press-Release-ASIA-VFS-Global-acquires-TT-Services.pdf"
              },
              {
                html:
                  "Czech Republic commences visa application operations for residents in Gurugram",
                pdf: "Press-Release-Czech-in-Gurgaon.pdf"
              },
              {
                html:
                  "VFS Global Edu Support Services partners with Oxademy to launch world’s first ‘AI-based’ online learning programmes for students",
                pdf: "VFS-Oxademy-press-release-July.pdf"
              },
              {
                html:
                  "Czech Republic Visa Application Centre inaugurated in Jalandhar",
                pdf: "Press-Release-Czech-in-Jalandhar.pdf"
              },
              {
                html:
                  "Ambassador of the Czech Republic inaugurates VFS Global Visa Application Centres in Chandigarh",
                pdf: "Press-Release-Czech-in-Chandigarh.pdf"
              },
              {
                html:
                  "Germany Visa Application Centre inaugurated in Bengaluru",
                pdf: "Press-Release-FINAL-Germanyin-BLZ.pdf"
              },
              {
                html:
                  "VFS Global appoints Mukesh Jain as Chief Technology Officer",
                pdf: "Press-Release-FINAL-Chief-Technology-Officer.pdf"
              },
              {
                html:
                  "VFS Global signs Government of Georgia as 55<sup>th</sup> client government, to set up first operations in India",
                pdf: "Press-Release-draft-Georgia-Delhi.pdf"
              },
              {
                html:
                  "VFS Global expands service network for Czech Republic, launches second Visa Application Centre in Kerala",
                pdf: "Czech-in-Thiruvananthapuram.pdf"
              },
              {
                html:
                  "New Russia Visa Application Centres in Germany open for football fans",
                pdf: "German-Release.pdf"
              },
              {
                html:
                  "VFS Global expands service network for South Africa, launches new Visa Application Centres in Zimbabwe",
                pdf: "SAinHarare-PressRelease-Final.pdf"
              },
              {
                html:
                  "After Dubai, Visa Application Centre for The Netherlands now launched in Abu Dhabi",
                pdf: "Press-Release-Netherlands-in-Abu-Dhabi.pdf"
              },
              {
                html:
                  "VFS Global awarded with the IMC Digital Technology Award for pioneering visa application mobile app",
                pdf: "Press-Release-FINAL-IT-awards-for-VFS-Global.pdf"
              },
              {
                html:
                  "VFS Global expands its network of Russia Visa Application Centres to France",
                pdf: "Press-Release-Russia-france.pdf"
              },
              {
                html:
                  "New Ireland Visa Application Centre in Doha provides enhanced convenience to travellers",
                pdf: "Press-Release-ireland-doha.pdf"
              },
              {
                html: "New France Visa Application Centre opened in Bengaluru",
                pdf: "Press-Release-FINAL-France-in-India.pdf"
              },
              {
                html:
                  "VFS Global expands service network for Czech Republic, launches Visa Application Centre in Puducherry",
                pdf: "Press-Release-Czech-puducherry.pdf"
              },
              {
                html:
                  "VFS Global launches first-ever VFS Global Visa Application Centre in Gaborone",
                pdf: "Press-release-south-africa.pdf"
              },
              {
                html:
                  "Gulf Air Appoints VFS Global to Provide Visas for Bahrain Visitors",
                pdf:
                  "Gulf-Air-Appoints-VFS-Global-to-Provide-Visas-for-Bahrain-Visitors.pdf"
              },
              {
                html:
                  "VFS Global launches nationwide network of Japan Visa Application Centres",
                pdf: "Press-Release-FINAL-JAPAN-nationwide-rollout.pdf"
              },
              {
                html:
                  "New UK Visa Application Centre formally inaugurated in Pune",
                pdf: "Press-Release-FINAL-UK-in-Pune.pdf"
              },
              {
                html:
                  "Launch of Czech Republic Visa Application Centre in Pune",
                pdf: "Press-Release-FINAL-Czech-centre-in-Pune.pdf"
              },
              {
                html:
                  "VFS Global expands service network for Czech Republic, launches Visa Application Centre in Kochi",
                pdf: "Press-Release-FINAL-Czech-in-Kochi.pdf"
              },
              {
                html:
                  "Czech Republic Visa Application Centre launched in Jaipur.",
                pdf: "Press-Release-FINAL-Czech-in-Jaipur.pdf"
              },
              {
                html:
                  "South Africa Visa Application Centre launched in Dubai for enhanced convenience to residents of the UAE",
                pdf: "Press-Release-SA-in-Dubai.pdf"
              },
              {
                html:
                  "Consul General of France inaugurates France Visa Application Centre in Pune at spacious new premise serving multiple countries under one roof",
                pdf: "Press-Release-France-in-Pune.pdf"
              },
              {
                html:
                  "Boost for Indo-China personnel exchange as ‘Chinese Visa Application Service Center’ is inaugurated at Connaught Place",
                pdf: "Press-Release-China-VAC-launch.pdf"
              },
              {
                html:
                  "Grand opening of the Japan Visa Application Centre in Colombo, Sri Lanka",
                pdf: "Press-Release-FINAL-Japan-VAC-in-Colombo.pdf"
              },
              {
                html:
                  "VFS Global launches first-ever South Africa Visa Application Centre in Senegal",
                pdf: "VFS-Global-launches-first-ever-South-Africa-Senegal.pdf"
              },
              {
                html:
                  "Denmark Visa Application Centres launched in Abu Dhabi and Dubai",
                pdf: "Press-Release-ENG-Denmark-in-Dubai.pdf"
              },
              {
                html:
                  "VFS Global expands network for Russia Visa Application Centres across Europe, Asia, and the Middle East",
                pdf: "Press-Release-europe-Global-Rollout.pdf"
              },
              {
                html:
                  "‘Premium Application Centre’ offering personalised services for UK visa applicants opens in Houston",
                pdf: "Press-release-houston.pdf"
              },
              {
                html:
                  "UK encourages Indian Visitors to apply early for visas with #beatthepeak campaign",
                pdf: "UK-encourages-Indian.pdf"
              },
              {
                html: "Russia Visa Application Centre launched in Dubai",
                pdf: "Press-release-dubai.pdf"
              },
              {
                html: "Ireland Visa Application Centre launched in Kuwait",
                pdf: "press-release-Ireland-kuwait.pdf"
              },
              {
                html:
                  "Second Belgium Visa Application Centre launched in the Middle East",
                pdf: "press-release-draft-abu-dhabi.pdf"
              },
              {
                html:
                  "VFS Global launches Czech Republic Visa Application Centre in Ahmedabad",
                pdf: "Czech-Republic-Visa-Application-Centre-in-Ahmedabad.pdf"
              }
            ]
          },
          {
            year: "2016",
            content: [
              {
                html:
                  "VFS Global launches first-ever Belgium Visa Application Centre in the Middle East",
                pdf: "press-release-belgium-saudi.pdf"
              },
              {
                html:
                  "Visa services network for the Czech Republic expanded to Kolkata",
                pdf: "press-release-czechrepublic-kolkata.pdf"
              },
              {
                html:
                  "New Japan Visa Application Centre in Hong Kong offers dedicated services, extended working hours for applicants",
                pdf: "Press-Release-Japan-in-HongKong.pdf"
              },
              {
                html:
                  "President of France François Hollande bestows the prestigious National Order of Merit on Zubin Karkaria",
                pdf:
                  "Press-Release-National-Order-of-Merit-on-Zubin-Karkaria.pdf"
              },
              {
                html:
                  "The Netherlands launches new Visa Application Centre in in Doha, in partnership with VFS Global",
                pdf: "Press-release-FINAL-Netherlands-in-Qatar.pdf"
              },
              {
                html:
                  "Indian Consular, Passport & Visas Centres launched in three cities in South Africa",
                pdf: "india-south-africa.pdf"
              },
              {
                html:
                  "VFS Global launches modernised France Visa Application Centre in Muscat, Oman",
                pdf: "Press-Release-France-in-Oman-ENGLISH.pdf"
              },
              {
                html: "Apply for UAE visa on your phone, anytime, anywhere",
                pdf: "Final-DVPC-mobile-app.pdf"
              },
              {
                html: "Turkey Visa Application Centre launched in Doha",
                pdf: "Turkey-Visa-Application-Centre-Doha.pdf"
              },
              {
                html:
                  "Media Statement: Business Continuity Plan for Cape Town Visa Application Centre",
                pdf: "VFSGlobal-Press-statement-Cape-town.pdf"
              },
              {
                html:
                  "Zubin Karkaria honoured with TAAI’s ‘Award of Distinction’",
                pdf: "Press-Release-TAAI-award-for-zubink.pdf"
              },
              {
                html:
                  "Switzerland & Croatia Joint Visa Application Centre moves to a larger premise in Doha",
                pdf: "Press-Release-Swiss-Croatia-JVAC-in-Doha.pdf"
              },
              {
                html: "UK Visa Application Centre launched in Bolivia",
                pdf: "press-realease-bolivia.pdf"
              },
              {
                html:
                  "VFS Global to launch new visa appointment system for the Embassy of Poland in Ukraine",
                pdf: "press-realese-poland-appointment.pdf"
              },
              {
                html:
                  "Cyprus Visa Application Centre launched \nin Amman, Jordan",
                pdf: "Cyprus-Visa-Application-Centre-launched.pdf"
              },
              {
                html:
                  "PCMM level 3 rating places VFS Global amongst an elite group of top-tier employers",
                pdf: "press_realese_final_pcmm.pdf"
              },
              {
                html:
                  "Italy Visa Application Centre moves to more central location in Amman for added convenience to applicants",
                pdf: "press-release-amman.pdf"
              },
              {
                html:
                  "Portugal launches new Visa Application Centre in Luanda, in partnership with VFS Global",
                pdf: "press-release-luanda-150716.pdf"
              },
              {
                html:
                  "VFS Global expands service network for Czech Republic, launches Visa Application Centre in Chennai",
                pdf: "Press-Release-Czech-Republic-150716.pdf"
              },
              {
                html: "UK Visa Application Centre launched in Peru",
                pdf: "press_realese_uk_peru_180716.pdf"
              },
              {
                html:
                  "Turkey Visa Application Centre inaugurated in Mumbai, India",
                pdf: "Press-release-Turkey-in-Mumbai-040716.pdf"
              },
              {
                html:
                  "VFS Global to manage Russia visa processing services in Romania",
                pdf: "press-release-290616.pdf"
              },
              {
                html:
                  "VFS Global expands service network for Czech Republic, launches Visa Application Centre in Bengaluru",
                pdf: "press-realese-czech-160616.pdf"
              },
              {
                html:
                  "‘Premium Application Centres’ open in Los Angeles, New York, and Washington DC",
                pdf: "Press-release-PACs-in-US-300516.pdf"
              },
              {
                html:
                  "Peter Brun appointed as Chief Communications Officer for VFS Global",
                pdf: "Press-release-Peter-Brun-As-CCO_300516.pdf"
              },
              {
                html:
                  "Make your summer break extra special with DVPC’s exciting new offer!",
                pdf: "Press-release-dvpc-050516.pdf"
              },
              {
                html:
                  "Visa applicants to Vietnam can now deposit applications at collection facility in Bhubaneswar",
                pdf: "Press-release-Vietnam-210416.pdf"
              },
              {
                html:
                  "VFS Global launches visa application services for Latvia in three cities in the United Kingdom",
                pdf: "Press-release-latvia-180416.pdf"
              },
              {
                html: "Cyprus Visa Application Centre launched in Abu Dhabi",
                pdf: "press-realeas-cyprus-110416.pdf"
              },
              {
                html:
                  "Submit your UK visa application and enrol biometrics conveniently from your home or office",
                pdf: "Press-Release-India.pdf"
              },
              {
                html:
                  "New visa application centre launched for the Netherlands in Kuwait City",
                pdf: "Press_Release_Netherlands_in_Kuwait_040416.pdf"
              },
              {
                html:
                  "VFS Global launches Chinese Visa Application Service Facility in Angola",
                pdf: "press_release_angola_310316.pdf"
              },
              {
                html:
                  "Turkey Visa Application Centres to launch in 18 cities across India, Nepal, and Maldives",
                pdf: "press_release_turkey_290316.pdf"
              },
              {
                html:
                  "VFS Global launches Chinese Visa Application Service Facility in the Democratic Republic of Congo",
                pdf: "press-release-china-230316.pdf"
              },
              {
                html:
                  "VFS Global opens Hungary Visa Application Centre in Manama, Bahrain",
                pdf: "Hungary_Visa_Application_EN_160316.pdf"
              },
              {
                html:
                  "Estonia Visa Application Centres launched in four cities",
                pdf: "Press_Release_Estonia_120316.pdf"
              },
              {
                html:
                  "VFS Global employees join effort to support child education, participate in ‘Walk for Education 2016’",
                pdf: "Walk_for_Education_060316.pdf"
              },
              {
                html:
                  "VFS Global launches Poland Visa Application Centres in four cities in Belarus",
                pdf: "press_release_belarus_260216.pdf"
              },
              {
                html:
                  "VFS Global opens Hungary Visa Application Centres in three cities across Saudi Arabia",
                pdf: "Press_Release_Hungary_110316.pdf"
              },
              {
                html:
                  "‘On Demand Mobile Biometrics’ service launched for UK visa applicants in Saudi Arabia",
                pdf: "final_release_ODBM_080216.pdf"
              },
              {
                html:
                  "Now, apply for UK visa from the comfort of your home as VFS Global launches ‘on demand’ service in Qatar",
                pdf: "Final_release_qatar_080216.pdf"
              },
              {
                html: "Hungary Visa Application Centre opened in Kuwait",
                pdf: "Visa_Application_Centre_in_Kuwait_280116.pdf"
              },
              {
                html:
                  "VFS Global launches France Visa Application Centre in Abuja",
                pdf: "Visa_Application_Centre_in_Abuja_220116.pdf"
              },
              {
                html:
                  "UK launches ‘platinum’ services for visa applicants in the UAE",
                pdf: "visa_applicants_in_the_UAE_220116.pdf"
              }
            ]
          },
          {
            year: "2015",
            content: [
              {
                html:
                  "The Czech Republic and VFS Global inaugurate \nVisa Application Centre in Oman",
                pdf: "Visa_Application_Centre_in_Oman_171215.pdf"
              },
              {
                html:
                  "Biometric enrolment for Schengen visas begins at centres across the UK",
                pdf: "Biometric_enrollment_091215.pdf"
              },
              {
                html:
                  "Tourism Minister Mahesh Sharma inaugurates Asia’s largest Visa Application Centre in Connaught Place",
                pdf: "Asia_071215.pdf"
              },
              {
                html:
                  "VFS Global launches Visa Application Centre for the Czech Republic in Bahrain",
                pdf: "Press_Release_final_bahrain_021215.pdf"
              },
              {
                html:
                  "VFS Global opens Estonia Visa Application Centre in Ivangorod",
                pdf: "Press_Release_final_estonia_021215.pdf"
              },
              {
                html:
                  "VFS Global launches Visa Application Centre for the Czech Republic in Kuwait",
                pdf: "press_release_kuwait_161115.pdf"
              },
              {
                html:
                  "VFS Global launches Visa Application Centre for the Czech Republic in Riyadh",
                pdf: "press_release_riyadh_071115.pdf"
              },
              {
                html: "Zubin Karkaria appointed as CEO of Kuoni Group",
                pdf: "press_release_Zubin_051115.pdf"
              },
              {
                html:
                  "VFS Global launches Visa Application Centres for the Czech Republic in the UAE",
                pdf: "press_release_UAE_041115.pdf"
              },
              {
                html:
                  "VFS Global rolls out biometric enrolment for Schengen visas at centres across India",
                pdf: "press_release_india_031115.pdf"
              },
              {
                html:
                  "VFS Global opens Dutch Visa Application Centre in Bangkok",
                pdf: "press_release_bangkok_301015.pdf"
              },
              {
                html:
                  "New Canada Visa Application Centre for Residents of Poland opens in Warsaw",
                pdf: "press_release_canada_poland_221015.pdf"
              },
              {
                html:
                  "VFS Global launches China Visa Application Service Facility in Kenya",
                pdf: "press_realease_china_nairobi_151015.pdf"
              },
              {
                html: "Veridos and VFS Global Announce Strategic Partnership",
                pdf: "Press_Release_varidos_091015.pdf"
              },
              {
                html:
                  "VFS Global inaugurates new Visa Application Centre in Caracas for applicants to Canada and UK",
                pdf: "Press_Release_canada_and_UK_071015.pdf"
              },
              {
                html:
                  "VFS Global launches visa application services for Greece and Lithuania in Armenia",
                pdf: "Press_Release_greece_and_lithuania_290915.pdf"
              },
              {
                html:
                  "VFS Global Schengen Visa Application Centre relocates to new and improved facility in Quito",
                pdf: "Press_Release_Schengen_visa_in_quito_160915.pdf"
              },
              {
                html:
                  "VFS Global launches Visa Application Centres for the Czech Republic for the first time in India",
                pdf: "Press_Release_Czech_in_Delhi_140915.pdf"
              },
              {
                html:
                  "VFS Global launches visa application service for Vietnam in Karnataka",
                pdf: "Press_Release-Vietnam_in_Karnataka_070915.pdf"
              },
              {
                html:
                  "VFS Global bags Express Intelligent Enterprise Award for LIDPro™<sup>*</sup> solution",
                pdf: "Press_release_Indian_Express_290815.pdf"
              },
              {
                html:
                  "VFS Global wins Today’s Traveller Award 2015 for Best Visa Service Provider",
                pdf: "Service_Provider_130815.pdf"
              },
              {
                html:
                  "VFS Global launches new services for the \nEmbassy of Spain in the UAE",
                pdf: "Press_release_UAE_final_120815.pdf"
              },
              {
                html:
                  "Portugal joins VFS Global Schengen Visa Application Centres in United Arab Emirates",
                pdf: "Press_release_UAE_ENG_230715.pdf"
              },
              {
                html:
                  "VFS Global launches visa application services for Embassy of the Russian Federation in Singapore",
                pdf: "russia_in_singapore_03715.pdf"
              },
              {
                html:
                  "Hungary and VFS Global extend visa service delivery to the Republic of Belarus",
                pdf: "Hungary_VAC_270615.pdf"
              },
              {
                html:
                  "VFS Global opens Premium South Africa Visa Application Centre in Port Harcourt",
                pdf: "sauthafrica_VAC_250615.pdf"
              },
              {
                html:
                  "VFS Global starts special service timings for UK Visa applicants in Dubai, UAE",
                pdf: "UK_VAC_Dubai_250615.pdf"
              },
              {
                html:
                  "Netherlands joins VFS Global Schengen Visa Application Centre in the Kingdom of Saudi Arabia",
                pdf: "press_release_natherlands_KSA_160615.pdf"
              },
              {
                html:
                  "Netherlands joins VFS Global Schengen Visa Application Centre in Muscat",
                pdf: "press_release_natherlands_muscat_16615.pdf"
              },
              {
                html:
                  "Norway and VFS Global extend visa service delivery to Amman in Jordan",
                pdf: "visa_service_delivery_010615.pdf"
              },
              {
                html: "VFS Global processes its 100 millionth application",
                pdf: "100_million_app.pdf"
              },
              {
                html:
                  "VFS Global wins award at International Business Excellence Awards 2015",
                pdf: "press_release_DVPC_250515.pdf"
              },
              {
                html:
                  "VFS Global offers a range of options for your travel to Dubai with Dubai Visa Processing Centre (DVPC)",
                pdf: "press_release_DVPC_190515.pdf"
              },
              {
                html:
                  "Portugal launched second Portugal Visa Application Centre with VFS Global in Kingdom of Saudi Arabia",
                pdf: "press_release_portugal_040515.pdf"
              },
              {
                html:
                  "VFS Global Vietnam Visa Application Centre inaugurated in Chennai",
                pdf: "press_release_chennai_300415.pdf"
              },
              {
                html:
                  "VFS Global opens new UK Visa Application Centre in Jaipur",
                pdf: "press_release_290415.pdf"
              },
              {
                html:
                  "VFS Global Vietnam Visa Application Centre inaugurated in Hyderabad",
                pdf: "pr_280415.pdf"
              },
              {
                html: "VFS Global inaugurates new premises in London",
                pdf: "new_vac_london_090415.pdf"
              },
              {
                html:
                  "New Canada Visa Application Centre for Residents of UAE opens in Dubai",
                pdf: "press_release_020415.pdf"
              },
              {
                html:
                  "Thailand outsources Visa Application Services to VFS Global in Kolkata",
                pdf: "press_release170315.pdf"
              },
              {
                html:
                  "Dubai Visa Processing Centre (DVPC) now also offers 30 day and 90 day multiple entry visa categories to UAE",
                pdf: "press_release_170315.pdf"
              },
              {
                html:
                  "VFS Global extends the South African Visa Application Process to seven new locations in India",
                pdf: "050315.pdf"
              },
              {
                html:
                  "VFS Global inaugurate Visa Application Centre for the Republic of Cyprus",
                pdf: "Cyprus_030315.pdf"
              },
              {
                html: "VFS Global team joins “Walk for Education 2015”",
                pdf: "walks_for_education_140215.pdf"
              },
              {
                html:
                  "Germany and VFS Global inaugurate Visa Application Centre in St. Petersburg",
                pdf: "press_release_eng_300115.pdf"
              },
              {
                html:
                  "VFS Global opens a new Italy Visa Application Centre in Kathmandu, Nepal",
                pdf: "New_VAC_210115.pdf"
              },
              {
                html: "Two New Sweden Visa Application Centres open in the UAE",
                pdf: "SVAC_210115.pdf"
              },
              {
                html:
                  "TnH Awards 2015 recognises and awards VFS Global for being the World’s Leading Visa Services Provider",
                pdf: "tnh_award_release_140115.pdf"
              }
            ]
          },
          {
            year: "2014",
            content: [
              {
                html:
                  "VFS Global Opens 8 New France Visa Application Centres in India",
                pdf: "france_visa_application_centres_in_india_10115.pdf"
              },
              {
                html:
                  "VFS Global launches new Thailand Visa Application Centre in Dhaka, Bangladesh",
                pdf:
                  "VFS_Global_launches_new_Thailand_Visa_Application_Centre.pdf"
              },
              {
                html:
                  "New Canada Visa Application Centre for Residents of Qatar opens in Doha",
                pdf: "press_release_in_doha_041114.pdf"
              },
              {
                html:
                  "VFS Global opens a new Italy Schengen Visa Application Collection Centre in Guwahati",
                pdf: "final_press_release_italy.pdf"
              },
              {
                html:
                  "VFS Global commences operations with the opening of its Joint Visa Application Centre for the governments of Malta and Australia in Makati City",
                pdf: "Press_release_malta_australia.pdf"
              },
              {
                html:
                  "VFS Global inaugurates a new Joint Visa Application Centre in Almaty, Kazakhstan",
                pdf: "VFS_Global_inaugurates_a_new_Joint.pdf"
              },
              {
                html:
                  "VFS Global Receives Recognition from \nAl-Nasr Sports Club for Commendable Service",
                pdf: "Al-Nasr_Sports_Club.pdf"
              },
              {
                html:
                  "Australia and VFS Global extend visa service delivery in India and Nepal",
                pdf: "final_press_release_australia_180614.pdf"
              },
              {
                html:
                  "VFS Global inaugurates a new Schengen Visa Application Centre in Dhaka, Bangladesh",
                pdf: "Press_Release-SVAC_in_Dhaka.pdf"
              },
              {
                html:
                  "VFS Global opens Switzerland Visa Application Centre in Manama, Bahrain",
                pdf: "Press_release-Swiss_in_Bahrain.pdf"
              },
              {
                html:
                  "VFS Global opens Switzerland Visa Application Centre in Kuwait City",
                pdf: "Press_Release-Swiss_in_Kuwait.pdf"
              },
              {
                html:
                  "VFS Global inaugurates a new Joint Visa Application Centre in Kolkata",
                pdf: "Press_Release_JVAC_CCU_14May2014_FINAL.pdf"
              },
              {
                html:
                  "Convenient UAE Visa Services for travellers to Dubai now in Nairobi, Kenya",
                pdf: "Press_Release_DVAC_in_Nairobi_Kenya_May2014.pdf"
              },
              {
                html:
                  "VFS Global enhances THAI Visa Application Centres and services in South Asia",
                pdf: "Press_Release_Thai_in_SouthAsia05May2014.pdf"
              },
              {
                html:
                  "Malaysia launches foreign worker Immigration Security Clearance (ISC)",
                pdf:
                  "Press_Release_Dhaka_Government_of_Malaysia_ISC_signing_ceremony_FINAL.pdf"
              },
              {
                html:
                  "VFS Global opens first Germany Visa Application Centre in Goa",
                pdf: "Final_Press_Release_for_Germany_VAC_opening_in_Goa.pdf"
              },
              {
                html:
                  "Germany and VFS Global inaugurate Visa Application Centre in Mumbai",
                pdf:
                  "Press_Release-_Germany_VAC_inauguration_in_Mumbai_260214.pdf"
              },
              {
                html:
                  "Government of Austria and VFS Global launch an Austria Visa Application Centre in Erbil, Iraq",
                pdf:
                  "Press_Release_Government_of_Austria_and_VFS_Global_launch_an_Austria_VAC_in_Iraq_260214.pdf"
              }
            ]
          },
          {
            year: "2013",
            content: [
              {
                html:
                  "New visa services introduced for the governments of Canada, Spain, The Netherlands and UK in Makati City",
                pdf:
                  "Press_Release_New_Visa_Services_for_Canada_Spain_The_Netherlands_and_UK_in_Makati_City_260214.pdf"
              },
              {
                html:
                  "Immigration New Zealand and VFS Global launch new visa services in UAE; opens dedicated visa application centre in Dubai",
                pdf:
                  "Press_Release-Immigration_New_Zealand_and_VFS_Global_launch_new_visa_services_in_UAE_28.09.13.pdf"
              },
              {
                html:
                  "VFS Global successfully conducts yet another Mobile Biometric Clinic in Goa",
                pdf:
                  "Press_Note-VFS_Global_successfully_conducts_yet_another_Mobile_Biometric_Clinic_in_Goa_28.09.13.pdf"
              },
              {
                html:
                  "Belgium and VFS Global extend visa service delivery to six new locations across India",
                pdf: "Belgium_VFS_030513.pdf"
              },
              {
                html:
                  "Zubin Karkaria appointed on the Executive Board of Kuoni Group",
                pdf: "PressRelease-ZubinKarkaria-090413.pdf"
              },
              {
                html:
                  "First of its kind Visa Application Centre for Five Countries Conference (5CC) launched in Singapore",
                pdf: "PressRelease-FirstofitskindVisaApplication-090413.pdf"
              },
              {
                html:
                  "Schengen Visa Application Centre in Yekaterinburg relocated to a convenient location",
                pdf: "PressRelease-SchengenVisaApplication-090413.pdf"
              },
              {
                html: "Germany Visa Application Centre opens in Al-Khobar",
                pdf: "Press_Release_Al-Khobar.pdf"
              }
            ]
          },
          {
            year: "2012",
            content: [
              {
                html: "Greek Visa Application Centres open in 8 Indian cities",
                pdf: "Press_Release_8_Indian_cities.pdf"
              },
              {
                html: "Greek Visa Application Centre opens in Nepal",
                pdf: "Press_Release_Nepal.pdf"
              },
              {
                html:
                  "Embassy of Slovenia appoints VFS Global to manage visa application services in 6 Indian cities",
                pdf:
                  "Slovenia-appoints-VFS-Global-in-6-Indian-cities_2.11.12.pdf"
              },
              {
                html:
                  "VFS Global launches a convenient service for travel agents applying  for Dubai Visa",
                pdf:
                  "Press-Release-VFS-Global-launches-a-convenient-service-for-travel-agents-applying-for-Dubai-Visa.pdf"
              },
              {
                html:
                  "Spain Visa Application Centre opens in Riyadh and Jeddah, KSA",
                pdf:
                  "Press-Release-Spain-Visa-Application-Centre-opens-in-Riyadh-and-Jeddah-KSA-26-May.pdf"
              },
              {
                html: "New UK Visa Application Centre Opens in Bengaluru",
                pdf:
                  "Press-Release-New-UK-Visa-Application-Centre-Opens-in-Bengaluru.pdf"
              },
              {
                html:
                  "Switzerland to open 10 regional Visa Application Centres across  India",
                pdf: "Press-Release-Satellite-Branches-for-Swiss-VACS.pdf"
              },
              {
                html: "Netherlands Visa Application Centre opens in Chennai",
                pdf:
                  "Press-Release-Netherlands-Visa-Application-Centre-opens-in-Chennai.pdf"
              },
              {
                html: "Japan Visa Application Centre opens in New Delhi",
                pdf:
                  "Press-Release-Japan-Visa-Application-Centre-opens-in-New-Delhi.pdf"
              },
              {
                html:
                  "Travel to Thailand now gets easier from Bengaluru – VFS Global opens  New Thailand Visa Application Centre in the heart of the city",
                pdf:
                  "Press-Release-Travel-to-Thailand-now-gets-easier-from-Bengaluru.pdf"
              },
              {
                html:
                  "French and Swiss visa applications to be processed through VFS Global’s new Schengen Visa Application Centre in Bengaluru",
                pdf:
                  "Press-Release-New-Schengen-Visa-Application-Centre-in-Bengaluru-to-accept-French-and-Swiss-visa-applications.pdf"
              },
              {
                html:
                  "Two New India Visa Application Centres open in Singapore",
                pdf:
                  "Press-Release-Two-New-India-Visa-Application-Centres-Open-in-Singapore.pdf"
              },
              {
                html:
                  "VFS Global opens Joint Visa Application Centre in Jakarta, Indonesia",
                pdf:
                  "Press-Release-VFS-Global-Opens-Joint-Visa-Application-in-Jakarta-Indonesia-(Final).pdf"
              }
            ]
          }
        ]
      },
      news_coverage: {
        //number of news coverage news to show at start in page (currently showing 3 news as given here)
        show_at_start: 3,
        //html of link for all news coverage news (currently displaying "Continue reading" as given here)
        link_html: "Continue reading",
        //content is shown year wise as provided below
        content_details: [
          {
            year: "2019",
            content: [
              {
                date: "September 2019",
                source: "Voyages Daffaires",
                title:
                  "E-visa: a Russian revolution in 2021?",
                link:
                  "https://www.voyages-d-affaires.com/e-visa-russe-en-2021-20190910.html",
                //give show_on_latest: true if you want to show current news in "Latest News" section
                show_on_latest: true
              },
              {
                date: "September 2019",
                source: "Suriname Herald",
                title:
                  "The Ministry of Foreign Affairs holds information session about applying for e-visa and e-tourist card",
                link:
                  "https://www.srherald.com/suriname/2019/09/09/buza-houdt-informatiesessie-over-aanvraag-e-visa-en-e-toeristenkaart/",
                //give show_on_latest: true if you want to show current news in "Latest News" section
                show_on_latest: true
              },
              {
                date: "September 2019",
                source: "Yahoo",
                title:
                  "Some countries require you to have travel insurance, others aren’t far behind",
                link:
                  "https://www.yahoo.com/lifestyle/countries-require-travel-insurance-others-130101681.html",
                //give show_on_latest: true if you want to show current news in "Latest News" section
                show_on_latest: true
              },
              {
                date: "September 2019",
                source: "Zawya",
                title:
                  "VFS Global' s Saudization initiative surpasses 50%; aims to exceed 60% by 2020",
                link:
                  "https://www.zawya.com/mena/en/press-releases/story/VFS_Global_s_Saudization_Initiative_surpasses_50_aims_to_exceed_60_by_2020-ZAWYA20190903102647/"
              },
              {
                date: "September 2019",
                source: "Saudi Gazette",
                title:
                  "VFS Global’s new ‘Visa At Your Doorstep’ service makes traveling easy",
                link:
                  "http://www.saudigazette.com.sa/article/575986/BUSINESS/VFS-Globals-new-Visa-At-Your-Doorstep-service-makes-traveling-easy"
              },
              {
                date: "September 2019",
                source: "Zawya",
                title:
                  "KSA: Don't turn life-changing religious experience into a nightmare",
                link:
                  "https://www.zawya.com/uae/en/press-releases/story/Dont_turn_lifechanging_religious_experience_into_a_nightmare-ZAWYA20190902100837/"
              },
              {
                date: "August 2019",
                source: "Nag",
                title:
                  "Russians will get a connection without international roaming",
                link:
                  "https://nag.ru/news/newsline/104917/rossiyane-poluchat-svyaz-bez-mejdunarodnogo-rouminga.html"
              },
              {
                date: "August 2019",
                source: "Tech HQ",
                title:
                  "Lessons on data privacy from VFS Global",
                link:
                  "https://techhq.com/2019/08/lessons-on-data-privacy-from-vfs-global/"
              },
              {
                date: "August 2019",
                source: "UAE News 24/7",
                title:
                  "Travelling like a pro with Omar Al Souma",
                link:
                  "https://uaenews247.com/2019/08/28/travelling-like-a-pro-with-omar-al-souma/"
              },
              {
                date: "August 2019",
                source: "Nhan Dan ",
                title:
                  "Vietnam, India bolster tourism cooperation",
                link:
                  "https://en.nhandan.org.vn/travel/item/7860402-vietnam-india-bolster-tourism-cooperation.html"
              },
              {
                date: "August 2019",
                source: "The Economic Times",
                title:
                  "US to waive mandatory interview for certain visas",
                link:
                  "https://economictimes.indiatimes.com/nri/visa-and-immigration/us-to-waive-mandatory-interview-for-certain-visas/articleshow/70885207.cms"
              },
              {
                date: "August 2019",
                source: "Observ Algerie",
                title:
                  "Visa for France: Important change at VFS Global Algeria",
                link:
                  "https://www.observalgerie.com/diaspora-algerienne-visas-et-immigration/visas-france-important-changement-vfs-global-algerie/"
              },
              {
                date: "August 2019",
                source: "Tourism Interfax",
                title:
                  "VFS Global became a visa operator of Hungary in Russia",
                link:
                  "https://tourism.interfax.ru/ru/news/articles/62017/"
              },
              {
                date: "August 2019",
                source: "Tech Huanqiu",
                title:
                  "Jingdong Xiaobai Credit signed strategic cooperation with VFS Global and Tiger Visa",
                link:
                  "https://tech.huanqiu.com/article/9CaKrnKmmal"
              },{
                date: "August 2019",
                source: "Obiaks News",
                title:
                  "NIMC extends NIN enrolment to Nigerians in Austria, Germany ",
                link:
                  "http://news.obiaks.com/190821020559/nimc-extends-nin-enrolment-to-nigerians-in-austria-germany"
              },{
                date: "August 2019",
                source: "Modern Ghana",
                title:
                  "Nigerians In Ghana Get New National Identification Number Enrolment Centre In Accra",
                link:
                  "https://www.modernghana.com/news/951098/nigerians-in-ghana-get-new-national-identification.html"
              },{
                date: "August 2019",
                source: "Reaction",
                title:
                  "California is leading the way on data privacy",
                link:
                  "https://reaction.life/california-is-leading-the-way-on-data-privacy/"
              },

              {
                date: "August 2019",
                source: "Menafn",
                title:
                  "Announcement for Azerbaijani citizens wishing to visit Canada ",
                link:
                  "https://menafn.com/1098886243/Announcement-for-Azerbaijani-citizens-wishing-to-visit-Canada-PHOTO"
              },
              {
                date: "August 2019",
                source: "Deccan Herald",
                title:
                  "E-Visa, hassle-free system faster than Visa-on-Arrival ",
                link:
                  "https://www.deccanherald.com/city/e-visa-hassle-free-system-faster-than-visa-on-arrival-754369.html"
              },
              {
                date: "August 2019",
                source: "Paul Writer",
                title:
                  "Customer Experience (CX) Rocks at VFS”: A First 100 days interview with Belson Coutinho, CMO, VFS ",
                link:
                  "https://paulwriter.com/customer-experience-cx-rocks-at-vfs-a-first-100-days-interview-with-belson-coutinho-cmo-vfs/"
              },
              {
                date: "August 2019",
                source: "The Financial Express",
                title:
                  "Applying for student visa? Avoid these 5 mistakes in your applications ",
                link:
                  "https://www.financialexpress.com/lifestyle/travel-tourism/applying-for-student-visa-avoid-these-5-mistakes-in-your-applications/1673256/"
              },
              {
                date: "August 2019",
                source: "Times Now",
                title:
                  "IRCTC Europe tour! Enjoy cruise ride, visit Eiffel Tower, Disneyland ",
                link:
                  "https://www.timesnownews.com/business-economy/industry/article/irctc-europe-tour-enjoy-cruise-ride-visit-eiffel-tower-disneyland/467063"
              },
              {
                date: "August 2019",
                source: "Travel Trend Today",
                title:
                  "VFS Global to continue with growth momentum in India ",
                link:
                  "https://www.traveltrendstoday.in/news/international/item/7476-vfs-global-to-continue-with-growth-momentum-in-india"
              },
              {
                date: "August 2019",
                source: "Times Travel",
                title:
                  "Georgia to provide eVisa to Indian visitors ",
                link:
                  "https://timesofindia.indiatimes.com/travel/things-to-do/georgia-to-provide-evisa-to-indian-visitors/as70572548.cms"
              },
              {
                date: "August 2019",
                source: "Gulf News",
                title:
                  "VFS warns against fake job offers in UAE sent in company's name ",
                link:
                  "https://gulfnews.com/uae/vfs-warns-against-fake-job-offers-in-uae-sent-in-companys-name-1.1565082880058"
              },
              {
                date: "August 2019",
                source: "Travel Biz Monitor",
                title:
                  "VFS Global inaugurates its first National Identification Number enrolment centre for the Nigerian Nationals in India ",
                link:
                  "http://www.travelbizmonitor.com/Trade-News/vfs-global-inaugurates-its-first-national-identification-number-enrolment-centre-for-the-nigerian-nationals-in-india-45130"
              },
              {
                date: "August 2019",
                source: "Tourism Interfax",
                title:
                  "Lithuanian visa center opened in Kaliningrad",
                link:
                  "https://tourism.interfax.ru/ru/news/articles/61409/"
              },
              {
                date: "August 2019",
                source: "Observ Algerie",
                title:
                  "French visa for Algerians: VFS Global announces new provisions ",
                link:
                  "https://www.observalgerie.com/actualite-algerie/visas-france-algeriens-vfs-global-annonce-nouvelles-dispositions/"
              },
              {
                date: "August 2019",
                source: "ZAWYA",
                title:
                  "National Identification Number enrolment centre opens for Nigerians residing in the Kingdom of Saudi Arabia ",
                link:
                  "https://www.zawya.com/mena/en/press-releases/story/National_Identification_Number_enrolment_centre_opens_for_Nigerians_residing_in_the_Kingdom_of_Saudi_Arabia-ZAWYA20190731133800/"
              },
              {
                date: "August 2019",
                source: "CIO Review India",
                title:
                  "Customer experience is pivotal to an organisation's competitive advantage ",
                link:
                  "https://customer-experience-management.cioreviewindia.com/cioviewpoint/customer-experience-is-pivotal-to-an-organisation-s-competitive-advantage-nid-1552-cid-73.html"
              },

              {
                date: "July 2019",
                source: "Financial Express",
                title:
                  "Applying for Visa? Avoid these 5 common mistakes in your visa applications ",
                link:
                  "https://www.financialexpress.com/lifestyle/travel-tourism/applying-for-visa-avoid-these-5-common-mistakes-in-your-visa-applications/1660702/"
              },
              {
                date: "July 2019",
                source: "Unian",
                title:
                  "Ukraine will open 18 visa centres in 16 countries ",
                link:
                  "https://www.unian.net/tourism/news/10635102-ukraina-otkroet-18-vizovyh-centrov-v-16-stranah.html"
              },
              {
                date: "July 2019",
                source: "Thai Visa",
                title:
                  "Bangkok Bank, British Embassy ink MoU granting visa privileges for cardholders ",
                link:
                  "https://news.thaivisa.com/article/38254/bangkok-bank-british-embassy-ink-mou-granting-visa-privileges-for-cardholders"
              },
              {
                date: "July 2019",
                source: "Premium Times",
                title:
                  "Nigerian citizens abroad to register for National Identification Number ",
                link:
                  "https://www.premiumtimesng.com/news/top-news/343749-nigerian-citizens-abroad-to-register-for-national-identification-number.html"
              },
              {
                date: "July 2019",
                source: "Arabian Business Online",
                title:
                  "Indian Power List 2019 – Making their mark in the UAE ",
                link:
                  "https://www.arabianbusiness.com/lists/424748-ipl2019-46-zubin-karkaria"
              },
              {
                date: "July 2019",
                source: "Living Gossip",
                title:
                  "Everything you should know about India business visa ",
                link:
                  "https://livinggossip.com/everything-you-should-know-about-india-business-visa/"
              },
              {
                date: "July 2019",
                source: "Human Resources Online",
                title:
                  "Bernard Martyris: The most in-demand skills of the future – and how to teach them ",
                link:
                  "https://www.humanresourcesonline.net/features/the-most-in-demand-skills-of-the-future-and-how-to-teach-them/"
              },
              {
                date: "July 2019",
                source: "Campaign India",
                title:
                  "Jet Airways' Belson Coutinho joins VFS as global CMO ",
                link:
                  "https://www.campaignindia.in/article/jet-airways-belson-coutinho-joins-vfs-as-global-cmo/453323"
              },
              {
                date: "July 2019",
                source: "Telangana Today",
                title:
                  "VFS Global to have ‘Student Saturdays’",
                link:
                  "https://telanganatoday.com/vfs-global-student-saturdays"
              },
              {
                date: "July 2019",
                source: "Silicon Trust",
                title:
                  "Online and beyond – what’s next for the delivery of citizen services? ",
                link:
                  "https://silicontrust.org/2019/07/24/online-and-beyond-whats-next-for-the-delivery-of-citizen-services/"
              },

              {
                date: "July 2019",
                source: "UNI India",
                title:
                  "VFS Global launches Student Saturdays for student visa applicants to United Kingdom ",
                link:
                  "http://www.uniindia.com/vfs-global-launches-student-saturdays-for-student-visa-applicants-to-united-kingdom/east/news/1674943.html"
              },
              {
                date: "July 2019",
                source: "Travel Biz Monitor",
                title:
                  "Georgia introduces eVisa solution for travellers from India by enhancing co-operation with VFS Global ",
                link:
                  "http://www.travelbizmonitor.com/Trade-News/georgia-introduces-evisa-solution-for-travellers-from-india-by-enhancing-cooperation-with-vfs-global-45059"
              },
              {
                date: "July 2019",
                source: "Schengen Visa Info",
                title:
                  "Fijians Can Apply for French Schengen Visas in Fiji Starting From September ",
                link:
                  "https://www.schengenvisainfo.com/news/fijians-can-apply-for-french-schengen-visas-in-fiji-starting-from-september/"
              },
              {
                date: "July 2019",
                source: "Travel Trends Today",
                title:
                  "Georgia enhances co-operation with VFS Global ",
                link:
                  "https://www.traveltrendstoday.in/news/international/item/7379-georgia-enhances-co-operation-with-vfs-global"
              },
              {
                date: "July 2019",
                source: "East Mojo",
                title:
                  "Manipur to get its 1st visa services centre on August 5 ",
                link:
                  "https://www.eastmojo.com/manipur/2019/07/19/manipur-to-get-its-1st-visa-services-centre-on-august-5"
              },
              {
                date: "July 2019",
                source: "Morton Fraser",
                title:
                  "How to make a visa application in 2019 ",
                link:
                  "https://www.morton-fraser.com/knowledge-hub/makevisa-application-2019"
              },
              {
                date: "July 2019",
                source: "FBC News",
                title:
                  "Schengen visa to be available locally from September ",
                link:
                  "https://www.fbcnews.com.fj/news/schengen-visa-to-be-available-locally-from-september/"
              },
              {
                date: "July 2019",
                source: "Liberian Observer",
                title:
                  "France to issue visas in Liberia ",
                link:
                  "https://www.liberianobserver.com/news/france-to-issue-visas-in-liberia-as-of-september/"
              },
              {
                date: "July 2019",
                source: "Le Petit Journal",
                title:
                  "Visas: Opening of the VFS center in Singapore ",
                link:
                  "https://lepetitjournal.com/singapour/visas-ouverture-du-centre-vfs-singapour-261668"
              },
              {
                date: "July 2019",
                source: "Education Times",
                title:
                  "How to make your visa application process hassle-free ",
                link:
                  "https://www.educationtimes.com/article/102/2019071520190715160330475c7f0311e/How-to-make-your-visa-application-process-hasslefree-.html"
              },
              {
                date: "July 2019",
                source: "The New Indian Express",
                title:
                  "Visa-at-doorstep service soars ",
                link:
                  "http://www.newindianexpress.com/cities/bengaluru/2019/jul/14/visa-at-doorstep-service-soars-2003616.html"
              },
              {
                date: "July 2019",
                source: "Live Mint",
                title:
                  "‘One of the key tasks at VFS is ensuring visa applicants don’t queue up for a long time’ ",
                link:
                  "https://www.livemint.com/technology/tech-news/-one-of-the-key-tasks-at-vfs-is-ensuring-visa-applicants-don-t-queue-up-for-a-long-time-1563130677577.html"
              },
              {
                date: "July 2019",
                source: "Minsk News",
                title:
                  "How to get a \"Schengen\" if there is no work, and what to do if you did not have time to leave the EU before the end of the visa ",
                link:
                  "https://minsknews.by/kak-poluchit-shengen-esli-net-rabotyi-i-chto-delat-esli-ne-uspel-pokinut-es-do-okonchaniya-vizyi/"
              },
              {
                date: "July 2019",
                source: "Gulf-Times",
                title:
                  "Visa Application Centre for visas to Ukraine opens in Qatar ",
                link:
                  "https://www.gulf-times.com/story/636231/Visa-Application-Centre-for-visas-to-Ukraine-opens"
              },
              {
                date: "July 2019",
                source: "Entrepreneur Middle East",
                title:
                  "Entrepreneur Middle East Hosts Round Table, Presented By Du, On Accelerating Digital Transformation ",
                link:
                  "https://www.entrepreneur.com/video/335699"
              },
              {
                date: "July 2019",
                source: "TourBus",
                title:
                  "Hungary changes provider of its visa center ",
                link:
                  "http://tourbus.ru/news/14991.html"
              },
              {
                date: "July 2019",
                source: "AME Info",
                title:
                  "Brick & mortar or click & mortar, the customer remains the King - Part 2 ",
                link:
                  "https://www.ameinfo.com/industry/travel/brick-and-mortar-or-click-and-mortar-the-customer-remains-the-king-2"
              },
              {
                date: "July 2019",
                source: "AME Info",
                title:
                  "Brick & mortar or click & mortar, the customer remains the King - Part 1 ",
                link:
                  "https://www.ameinfo.com/industry/travel/brickandmortar-or-clickandmortar-the-customer-remains-the-king-1"
              },
              {
                date: "July 2019",
                source: "Deccan Chronicle",
                title:
                  "Kochi: Visa-at-doorstep gaining traction ",
                link:
                  "https://www.deccanchronicle.com/nation/current-affairs/100719/kochi-visa-at-doorstep-gaining-traction.html"
              },

              {
                date: "July 2019",
                source: "UAE News 247",
                title:
                  "VFS Global processes its 200 millionth application ",
                link:
                  "https://uaenews247.com/2019/07/08/vfs-global-processes-its-200-millionth-application/"
              },
              {
                date: "July 2019",
                source: "Forbes Middle East",
                title:
                  "Top 30 Indian Executives In The Middle East ",
                link:
                  "https://www.forbesmiddleeast.com/list/top-30-indian-executives-in-the-middle-east"
              },
              {
                date: "July 2019",
                source: "CIO Mag",
                title:
                  "We help governments deliver better quality public services while respecting budgetary and security constraints",
                link:
                  "https://cio-mag.com/nous-aidons-les-gouvernements-a-offrir-des-services-publics-de-meilleure-qualite-tout-en-respectant-leurs-contraintes-budgetaires-et-securitaires/"
              },
              {
                date: "July 2019",
                source: "Business Standard",
                title:
                  "Rise in customers opting for personalised visa processing: VFS ",
                link:
                  "https://www.business-standard.com/article/pti-stories/rise-in-customers-opting-for-personalised-visa-processing-vfs-119070300880_1.html"
              },
              {
                date: "July 2019",
                source: "MENAFN",
                title:
                  "Ukrainian visa centre opens in Sydney ",
                link:
                  "https://menafn.com/1098710177/Ukrainian-visa-centre-opens-in-Sydney"
              },
              {
                date: "June 2019",
                source: "Fortune India",
                title:
                  "As globetrotters evolve, so do travel innovations ",
                link:
                  "https://www.fortuneindia.com/opinion/as-globetrotters-evolve-so-do-travel-innovations/103347"
              },
              {
                date: "June 2019",
                source: "Kursiv",
                title:
                  "How to get a Schengen visa for a longer period",
                link:
                  "https://kursiv.kz/news/obschestvo/2019-07/kak-poluchit-shengenskuyu-vizu-na-bolee-dolgiy-srok"
              },
              {
                date: "June 2019",
                source: "Chinese NZ Herald",
                title:
                  "Ireland's new five-year visa for Chinese tourists, \"Emerald Green Island\" makes it easy for you to play ",
                link:
                  "http://www.chinesenzherald.co.nz/news/travel/new-five-year-visa-for-chinese-tourists-visiting-ireland/"
              },
              {
                date: "June 2019",
                source: "UAE News 247",
                title:
                  "VFS Global inaugurates National Identification Number enrolment centre for Nigerian residents in the UAE ",
                link:
                  "https://uaenews247.com/2019/06/29/vfs-global-inaugurates-national-identification-number-enrolment-centre-for-nigerian-residents-in-the-uae/"
              },
              {
                date: "June 2019",
                source: "Netherlands and you",
                title:
                  "Visa applications in Brazil via VFS Global ",
                link:
                  "https://www.netherlandsandyou.nl/latest-news/news/2019/06/27/visa-applications-in-brazil-via-vfs-global"
              },

              {
                date: "June 2019",
                source: "Sundiata Post",
                title:
                  "NIMC extends diaspora enrolment to India ",
                link:
                  "https://sundiatapost.com/2019/06/22/nimc-extends-diaspora-enrolment-to-india/"
              },
              {
                date: "June 2019",
                source: "Entrepreneur Middle East",
                title:
                  "Entrepreneur Middle East Hosts Round Table, Presented By Du, On Accelerating Digital Transformation ",
                link:
                  "https://www.entrepreneur.com/article/335699"
              },
              {
                date: "June 2019",
                source: "BW Hotelier",
                title:
                  "VFS Global Making Visa Application Easier ",
                link:
                  "http://bwhotelier.businessworld.in/article/VFS-Global-Making-Visa-Application-Easier/21-06-2019-172168/"
              },
              {
                date: "June 2019",
                source: "Irish Tech News",
                title:
                  "HOW AI VOICE TECHNOLOGY CAN REVOLUTIONISE TRAVEL IN 2019 WITH BENJAMIN BOESCH ",
                link:
                  "https://irishtechnews.ie/how-ai-voice-technology-can-revolutionise-travel/"
              },
              {
                date: "June 2019",
                source: "Outlook Traveller",
                title:
                  "5 Things To Keep In Mind With Visa Applications ",
                link:
                  "https://www.outlookindia.com/outlooktraveller/explore/story/69641/5-things-to-keep-in-mind-with-visa-applications"
              },
              {
                date: "June 2019",
                source: "India Inc",
                title:
                  "Howzatt! The ICC Cricket World Cup will take UK-India travel figures across many boundaries ",
                link:
                  "https://indiaincgroup.com/howzatt-the-icc-cricket-world-cup-will-take-uk-india-travel-figures-across-many-boundariesl-india-global-business/"
              },
              {
                date: "June 2019",
                source: "Deccan Chronicle",
                title:
                  "Changes in the travel experience enabled by technology ",
                link:
                  "https://www.deccanchronicle.com/technology/in-other-news/250619/changes-in-the-travel-experience-enabled-by-technology.html"
              },
              {
                date: "June 2019",
                source: "TECHWIRE ASIA",
                title:
                  "60pc of privacy professionals concerned about compliance ",
                link:
                  "https://techwireasia.com/2019/06/60pc-of-privacy-professionals-concerned-about-compliance/"
              },
              {
                date: "June 2019",
                source: "The Tribune",
                title:
                  "Visa applications went up 66% in Jalandhar alone last year ",
                link:
                  "https://www.tribuneindia.com/news/nation/visa-applications-went-up-66-in-jalandhar-alone-last-year/787459.html"
              },
              {
                date: "June 2019",
                source: "Business Traveller",
                title:
                  "VFS Global unveils visa application trends",
                link:
                  "https://www.businesstraveller.com/business-travel/2019/06/13/vfs-global-unveils-visa-application-trends/"
              },
              {
                date: "June 2019",
                source: "TnH",
                title:
                  "Visa services to help you begin your travel in comfort ",
                link:
                  "http://www.tnhglobal.com/visa-services-to-help-you-begin-your-travel-in-comfort/"
              },
              {
                date: "June 2019",
                source: "Times of India",
                title:
                  "Italian embassy launches Casa Italia at VFS Global in Delhi ",
                link:
                  "https://timesofindia.indiatimes.com/business/india-business/italian-embassy-launches-casa-italia-at-vfs-global-in-delhi/articleshow/69601492.cms"
              },
              {
                date: "June 2019",
                source: "Business Standard",
                title:
                  "Indian entrepreneur named Global Game Changer in UK ",
                link:
                  "https://www.business-standard.com/article/pti-stories/indian-entrepreneur-named-global-game-changer-in-uk-119053101351_1.html"
              },
              {
                date: "May 2019",
                source: "AME Info",
                title:
                  "Blockchain making itself at home in hospitality ",
                link:
                  "https://www.ameinfo.com/industry/travel/exclusive-blockchain-making-itself-at-home-in-hospitality"
              },
              {
                date: "May 2019",
                source: "Outlook India",
                title:
                  "Your dream Italian holiday is made possible again as VFS Global gets re-awarded contract to provide Italy visa service in India",
                link:
                  "https://www.outlookindia.com/outlooktraveller/travelnews/story/69459/vfs-global-will-once-again-provide-italy-visa-services-in-india"
              },
              {
                date: "May 2019",
                source: "Conde Nast Traveller",
                title:
                  "6 ways to get your UK visa without a hassle",
                link:
                  "https://www.vfsglobal.com/en/governments/news-coverage.html"
              },

              {
                date: "May 2019",
                source: "Financial Express",
                title:
                  "Planning to visit UK for Cricket World Cup: Here are some tips to apply for visa online",
                link:
                  "https://www.financialexpress.com/lifestyle/travel-tourism/icc-cricket-world-cup-united-kingdom-visa-application-online-india-login-page-number/1579251/"
              },
              {
                date: "May 2019",
                source: "Khaleej Times",
                title:
                  "Why personalised services are rising in the digital age",
                link:
                  "https://www.khaleejtimes.com/why-personalised-services-are-rising-in-the-digital-age"
              },
              {
                date: "May 2019",
                source: "AME Info",
                title:
                  "Stay hungry, competitive: the digital age is here, act now",
                link:
                  "https://www.ameinfo.com/industry/travel/digital-age-act-benjamin-boesch"
              },
              {
                date: "May 2019",
                source: "UAE News 24/7",
                title:
                  "NEW VISA APPLICATION CENTERS OPEN IN RIYADH, AL KHOBAR AND JEDDAH FOR VISAS TO IRELAND",
                link:
                  "https://uaenews247.com/2019/05/01/new-visa-application-centers-open-in-riyadh-al-khobar-and-jeddah-for-visas-to-ireland/"
              },


              {
                date: "April 2019",
                source: "The Hindu",
                title:
                  "VFS Global processes 13% more visas in 2018 ",
                link:
                  "https://www.thehindu.com/business/Industry/vfs-global-processes-13-more-visas-in-2018/article26935606.ece"
              },
              {
                date: "April 2019",
                source: "Financial Express",
                title:
                  "New value added services make visa application process easy like never before ",
                link:
                  "https://www.financialexpress.com/lifestyle/travel-tourism/new-value-added-services-make-visa-application-process-easy-like-never-before/1556942/"
              },
              {
                date: "April 2019",
                source: "Express Travel",
                title:
                  "Digital Transformation Will Have A Clear Impact On The Traditional Models: Zubin Karkaria",
                link:
                  "https://www.expresstravel.in/cover-story-travel/digital-transformation-will-have-a-clear-impact-on-the-traditional-models-zubin-karkaria/409907/"
              },
              {
                date: "April 2019",
                source: "Destination Reporter",
                title:
                  "VFS Global Wins the Coveted Dubai Quality Global Award (DQGA)",
                link:
                  "https://destinationreporterindia.com/2019/04/12/vfs-global-wins-the-coveted-dubai-quality-global-award-dqga/"
              },
              {
                date: "April 2019",
                source: "The Times, Kuwait",
                title:
                  "UK Visas and Immigration partners with VFS Global for Cricket World Cup 2019",
                link:
                  "https://www.news.timeskuwait.com/uk-visas-and-immigration-partners-with-vfs-global-for-cricket-world-cup-2019/"
              },
              {
                date: "April 2019",
                source: "Financial Express",
                title:
                  "Planning to visit Slovakia? Now file for Visa in newly inaugurated Application Centre in New Delhi ",
                link:
                  "https://www.financialexpress.com/lifestyle/travel-tourism/slovakia-visa-application-centre-in-new-delhi-europe-visa-travel-bratislava/1547208/"
              },
              {
                date: "April 2019",
                source: "Emirates News 24/7",
                title:
                  "Visa service packages for Cricket World Cup 2019 in UK",
                link:
                  "https://www.traveltrendstoday.in/news/tato/item/6902-vfs-global-attains-pcmm-level-5-rating"
              },
              {
                date: "March 2019",
                source: "Travel Trends Today",
                title:
                  "VFS Global Attains PCMM Level 5 Rating ",
                link:
                  "https://www.traveltrendstoday.in/news/tato/item/6902-vfs-global-attains-pcmm-level-5-rating"
              },
              {
                date: "March 2019",
                source: "Financial Express",
                title:
                  "More Indians from Tier II cities traveling abroad than ever before! Punjab city tops the chart ",
                link:
                  "https://www.financialexpress.com/lifestyle/travel-tourism/more-indians-from-tier-ii-cities-traveling-abroad-than-ever-before-punjab-city-tops-the-chart/1531678/"
              },
              {
                date: "March 2019",
                source: "PR Newswire",
                title:
                  "VFS Global Launches Exclusive Netherlands Passport and ID Application Centre in the United States of America ",
                link:
                  "https://www.prnewswire.com/news-releases/vfs-global-launches-exclusive-netherlands-passport-and-id-application-centre-in-the-united-states-of-america-300819359.html"
              },
              {
                date: "March 2019",
                source: "Financial Express",
                title:
                  "Modus operandi of Visa fraud: How victims get lured and defrauded",
                link:
                  "https://www.financialexpress.com/lifestyle/travel-tourism/modus-operandi-of-visa-fraud-how-victims-get-lured-and-defrauded/1516351/"
              },
              {
                date: "March 2019",
                source: "Live Mint",
                title:
                  "Barry Cook: Mint Digital Innovation Summit 2019 - An Overview",
                link:
                  "https://www.livemint.com/news/india/mint-digital-innovation-summit-2019-an-overview-1552460296576.html"
              },
              {
                date: "March 2019",
                source: "Arab News",
                title: "New Belgium visa application centers in Alkhobar, Jeddah",
                link:
                  "http://www.arabnews.com/node/1466316/corporate-news"
              },
              {
                date: "March 2019",
                source: "Money Control",
                title: "Czech Republic becoming preferred destination for Indians, footfall grows by 12.5% in 2018",
                link:
                  "https://www.moneycontrol.com/news/trends/travel-trends/czech-republic-becoming-preferred-destination-for-indians-footfall-grows-by-12-5-in-2018-3640641.html"
              },
              {
                date: "March 2019",
                source: "Zawya",
                title: "New Visa Application Centre opens in Al Khobar and Jeddah for Schengen visas to Belgium",
                link:
                  "https://www.zawya.com/mena/en/press-releases/story/New_Visa_Application_Centre_Opens_in_Al_Khobar_and_Jeddah_for_Schengen_Visas_to_Belgium-ZAWYA20190312071558/"
              },
              {
                date: "March 2019",
                source: "CXO Insight",
                title: "Vinay Malhotra: The rise of the ‘order’ economy",
                link:
                  "https://www.cxoinsightme.com/opinions/the-rise-of-the-order-economy/"
              },
              {
                date: "March 2019",
                source: "Asian Age",
                title: "UK goes all out to woo Indians for World Cup",
                link:
                  "http://www.asianage.com/business/in-other-news/050319/uk-goes-all-out-to-woo-indians-for-world-cup.html"
              },
              {
                date: "February 2019",
                source: "The Telegraph",
                title:
                  "Easier UK visa before cricket World Cup",
                link:
                  "https://www.telegraphindia.com/states/west-bengal/easier-uk-visa-before-cricket-world-cup/cid/1685309"
              },
              {
                date: "February 2019",
                source: "Money Control",
                title:
                  "Ben Boesch: Electronic visas to biometric gates, how smart technologies are transforming air travel",
                link:
                  "https://www.moneycontrol.com/news/trends/travel-trends/electronic-visas-to-biometric-gates-how-smart-technologies-are-transforming-air-travel-3570291.html"
              },
              {
                date: "February 2019",
                source: "Money Control",
                title:
                  "New technology transforms UK visa service in India with new interface, self-upload option",
                link:
                  "https://www.moneycontrol.com/news/trends/travel-trends/new-technology-transforms-uk-visa-service-in-india-with-new-interface-self-upload-option-3568661.html"
              },
              {
                date: "February 2019",
                source: "Financial Express",
                title:
                  "Sharp rise in doorstep visa service in Tier-II cities; Indore and Nagpur leading the pack",
                link:
                  "https://www.financialexpress.com/lifestyle/travel-tourism/sharp-rise-in-doorstep-visa-service-in-tier-ii-cities-indore-and-nagpur-leading-the-pack/1492357/"
              },
              {
                date: "February 2019",
                source: "Live Mint",
                title:
                  "Thai weekend made easy",
                link:
                  "https://www.livemint.com/mint-lounge/features/thai-weekend-made-easy-1550398681231.html"
              },
              {
                date: "February 2019",
                source: "The Economic Times",
                title:
                  "144% Increase in Indians opting for doorstep visa applications: VFS Global",
                link:
                  "https://economictimes.indiatimes.com/nri/visa-and-immigration/144-increase-in-indians-opting-for-doorstep-visa-applications-vfs-global/articleshow/67991462.cms"
              },
              {
                date: "February 2019",
                source: "CIO Dialogues",
                title:
                  "Innovation and technology are key business drivers for us ",
                link:
                  "https://www.ciodialogues.com/index.php/cio-voice/innovation-and-technology-are-key-business-drivers-for-us/"
              },
              {
                date: "February 2019",
                source: "Svitnov",
                title: "For Kazakhstan, Thailand introduces electronic visas ",
                link:
                  "https://svitnov.com/kz/society/90098654-dlja-kazahstancev-tailand-vvodit-elektronnye-vizy-/"
              },
              {
                date: "February 2019",
                source: "Travel Weekly",
                title: "Thailand introduces new e-visa scheme ",
                link:
                  "https://timesofindia.indiatimes.com/business/india-business/thailand-to-offer-e-visa-on-arrival-from-feb-14/articleshow/67742908.cms"
              },
              {
                date: "January 2019",
                source: "The Times of India",
                title: "Thailand to offer e-visa on arrival from Feb 14 ",
                link:
                  "http://www.travelweekly.co.uk/articles/322726/thailand-introduces-new-e-visa-scheme"
              },
              {
                date: "January 2019",
                source: "Detik Travel",
                title:
                  "No need to go to the embassy, make a German visa now only 7 days",
                link:
                  "https://travel.detik.com/international-destination/d-4405753/tak-perlu-ke-kedutaan-bikin-visa-jerman-kini-cuma-7-hari"
              },
              {
                date: "January 2019",
                source: "Travel Biz Monitor",
                title:
                  "VFS Global awarded contract to manage passport services in Ghana",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/vfs-global-awarded-contract-to-manage-passport-services-in-ghana-39819"
              },
              {
                date: "January 2019",
                source: "The Indian Express",
                title:
                  "30 more services to be added to doorstep delivery scheme from February",
                link:
                  "https://indianexpress.com/article/cities/delhi/30-more-services-to-be-added-to-doorstep-delivery-scheme-from-february-5542024/"
              },
              {
                date: "January 2019",
                source: "Milestone",
                title: "CEO VFS Global: Zubin Karkaria ",
                link:
                  "https://www.milestonemagazine.com/2018/12/ceo-vfs-global-zubin-karkaria/"
              },
              {
                date: "January 2019",
                source: "SC Media",
                title:
                  "Barry Cook: Don't look back in anger - GDPR compliance needs ongoing work ",
                link:
                  "https://www.scmagazineuk.com/dont-look-back-anger-gdpr-compliance-needs-ongoing-work/article/1521850"
              },
              {
                date: "January 2019",
                source: "Mfidie",
                title:
                  "How to process your online Ghana passport application in 30 minutes ",
                link:
                  "https://mfidie.com/ghana-passport-application-30-minutes/"
              }
            ]
          },
          {
            year: "2018",
            content: [
              {
                date: "December 2018",
                source: "Irish Tech News",
                title:
                  "6 months of GDPR: how to evaluate and improve your business’s compliance ",
                link:
                  "https://irishtechnews.ie/6-months-of-gdpr-how-to-evaluate-and-improve-your-businesss-compliance/"
              },
              {
                date: "December 2018",
                source: "The Economic Times",
                title:
                  "Here's how Zubin Karkaria is taking the $500-million firm VFS Global on a new tech adventure  ",
                link:
                  "https://economictimes.indiatimes.com/nri/visa-and-immigration/heres-how-zubin-karkaria-is-taking-the-500-million-firm-vfs-global-on-a-new-tech-adventure/articleshow/67210726.cms"
              },
              {
                date: "December 2018",
                source: "Travel Biz Monitor",
                title:
                  "Russia Visa Application Centre now open in 4 key Indian metro cities ",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/russia-vac-now-open-in-4-key-indian-metro-cities-38662"
              },
              {
                date: "December 2018",
                source: "Forbes",
                title:
                  "Meet Zubin Karkaria, The Man Who Built The World's Largest Visa And Consular Services Company ",
                link:
                  "https://www.forbes.com/sites/mfonobongnsehe/2018/12/17/meet-zubin-karkaria-the-man-who-built-the-worlds-largest-visa-and-consular-services-company/#8cad50158daa"
              },
              {
                date: "December 2018",
                source: "TravelBiz Monitor",
                title:
                  "Italy extends visa services contract; strengthens partnership with VFS Global ",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/italy-extends-visa-services-contract-strengthens-partnership-with--vfs-global-38641"
              },
              {
                date: "December 2018",
                source: "Express Computer",
                title:
                  "Barry Cook: Ensuring robust and multi-layered safeguards ",
                link:
                  "https://www.expresscomputer.in/security/ensuring-robust-and-multi-layered-safeguards/30778/"
              },
              {
                date: "December 2018",
                source: "The Economic Times",
                title:
                  "International vacations in trend for Indian tourists this holiday season ",
                link:
                  "https://economictimes.indiatimes.com/industry/services/travel/international-vacations-in-trend-for-indian-tourists-this-holiday-season/articleshow/67107995.cms"
              },
              {
                date: "December 2018",
                source: "GDN Online",
                title: "China opens new visa application centre in Kuwait ",
                link:
                  "http://www.gdnonline.com/Details/456133/China-opens-new-visa-application-centre-in-Kuwait"
              },
              {
                date: "December 2018",
                source: "TravelBiz Monitor",
                title:
                  "VFS Global appoints Jiten Vyas & Vinay Malhotra to its Executive Board ",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/vfs-global-appoints-jiten-vyas--vinay-malhotra-to-its-executive-board-36624"
              },
              {
                date: "December 2018",
                source: "India Inc",
                title:
                  "Is India set to become the next budget travel hotspot for Britain? ",
                link:
                  "https://indiaincgroup.com/is-india-set-to-become-the-next-budget-travel-hotspot-for-britain/?fbclid=IwAR1o7J92Ke6OBO84qX5eSoZ4cC_nKaIhXSawNaveL05aQVEnThUUO_rUqJc"
              },
              {
                date: "December 2018",
                source: "Zawya",
                title: "VFS launches visa application centre in Baghdad ",
                link:
                  "https://www.zawya.com/mena/en/business/story/VFS_launches_visa_application_centre_in_Baghdad-SNG_132308010/"
              },
              {
                date: "December 2018",
                source: "Arab News",
                title:
                  "KSA: VFS Global to launch Privilege Program in Kingdom ",
                link: "http://www.arabnews.com/node/1415646/corporate-news"
              },
              {
                date: "December 2018",
                source: "Travel Trends Today",
                title:
                  "VFS Global bags global visa contract for The Netherlands ",
                link:
                  "https://www.traveltrendstoday.in/news/international/item/6594-vfs-global-bags-global-visa-contract-for-the-netherlands"
              },
              {
                date: "December 2018",
                source: "Saudi Gazette",
                title: "New EU data protection law a harbinger of change ",
                link: "http://saudigazette.com.sa/article/549425"
              },
              {
                date: "November 2018",
                source: "Money Control",
                title:
                  "US, UK still popular choice for Indian travellers: VFS Global",
                link:
                  "https://www.moneycontrol.com/news/business/us-uk-still-popular-choice-for-indian-travellers-vfs-global-3236751.html"
              },
              {
                date: "November 2018",
                source: "Saudi Gazette",
                title: "New EU data protection law is a harbinger of change ",
                link:
                  "http://saudigazette.com.sa/article/548778/BUSINESS/New-EU-data-protection-law-is-a-harbinger-of-change"
              },
              {
                date: "November 2018",
                source: "Zawya",
                title:
                  "Over 18% growth in travel from the UAE to the Czech Republic in H1 2018: CzechTourism ",
                link:
                  "https://www.zawya.com/mena/en/press-releases/story/Over_18_growth_in_travel_from_the_UAE_to_the_Czech_Republic_in_H1_2018_CzechTourism-ZAWYA20181125110124/"
              },
              {
                date: "November 2018",
                source: "A Tarde",
                title:
                  "New Canadian visa application center opens in Cali to make process more convenient ",
                link:
                  "http://atarde.uol.com.br/economia/pr-newswire/noticias/2013278-novo-centro-de-solicitacao-de-vistos-canadenses-e-inaugurado-em-cali-para-tornar-processo-mais-conveniente"
              },
              {
                date: "November 2018",
                source: "Observ Algerie",
                title:
                  "Here's how to make appointments with the new Schengen visa procedure ",
                link:
                  "https://observalgerie.com/actualite-algerie/societe/immigration/comment-prendre-rendez-vous-avec-la-nouvelle-procedure-de-visas-schengen/"
              },
              {
                date: "November 2018",
                source: "The Economic Times",
                title: "Moving data to India will cost 3 mn euros: VFS Global ",
                link:
                  "https://economictimes.indiatimes.com/tech/internet/moving-data-to-india-will-cost-3-mn-euros-vfs-global/articleshow/66686742.cms"
              },
              {
                date: "November 2018",
                source: "Tourism Breaking News",
                title:
                  "Slovakia to operate 38 new VACs in 10 countries including India ",
                link:
                  "https://tourismbreakingnews.com/slovakia-to-operate-38-new-vacs-in-10-countries-including-india/"
              },
              {
                date: "November 2018",
                source: "Nation News",
                title: "New Canada Visa Application Centre opens in Barbados ",
                link:
                  "http://www.nationnews.com/nationnews/news/212126/canada-visa-application-centre-barbados"
              },
              {
                date: "November 2018",
                source: "Jamaica Observer",
                title: "France opens visa applicaion centre in Kingston",
                link:
                  "http://www.jamaicaobserver.com/news/france-opens-visa-applicaion-centre-in-kingston_148990?profile=1373"
              },
              {
                date: "November 2018",
                source: "Trade Arabia",
                title: "Ireland opens first visa application centre in Dubai",
                link: "http://www.tradearabia.com/news/TTN_347129.html"
              },
              {
                date: "November 2018",
                source: "The Times of India",
                title: "Visa applications to France from Chennai up 39 percent",
                link:
                  "https://timesofindia.indiatimes.com/city/puducherry/visa-applications-to-france-from-chennai-up-39-percent/articleshow/66494769.cms"
              },
              {
                date: "November 2018",
                source: "Gulf News",
                title: "VFS Global to process visa to Slovenia",
                link:
                  "https://gulfnews.com/news/uae/society/vfs-global-to-process-visa-to-slovenia-1.2296610"
              },
              {
                date: "October 2018",
                source: "Zawya",
                title:
                  "VFS Global signs visa service contracts with eight European Governments",
                link:
                  "https://www.zawya.com/mena/en/press-releases/story/VFS_Global_signs_visa_service_contracts_with_eight_EuropeannbspGovernments-ZAWYA20181031065849/"
              },
              {
                date: "October 2018",
                source: "Economic Times",
                title:
                  "Eastern Europe getting popular on the radar of Indian travellers",
                link:
                  "https://economictimes.indiatimes.com/industry/services/travel/eastern-europe-getting-popular-on-the-radar-of-indian-travellers/articleshow/66443224.cms?from=mdr"
              },
              {
                date: "October 2018",
                source: "Business Insider",
                title:
                  "VFS Global signs visa service contracts with eight European Governments",
                link:
                  "https://www.business-standard.com/article/pti-stories/vfs-global-signs-visa-service-contracts-with-eight-european-governments-118102600509_1.html"
              },
              {
                date: "October 2018",
                source: "Asia Travel Tips",
                title:
                  "VFS Global to operate Germany Visa Application Centres in 36 New Asia Pacific locations",
                link:
                  "http://www.asiatraveltips.com/news18/2910-VFSGlobal.shtml"
              },
              {
                date: "October 2018",
                source: "Gulf Times",
                title: "Qatar: VFS Global to process Greece Visas",
                link:
                  "https://www.gulf-times.com/story/610889/VFS-Global-to-process-Greece-visas"
              },
              {
                date: "October 2018",
                source: "Silicon Republic",
                title:
                  "Barry Cook: Still struggling with GDPR? Here are some tips for SMEs",
                link:
                  "https://www.siliconrepublic.com/enterprise/gdpr-compliance-smes"
              },
              {
                date: "October 2018",
                source: "Express Travel World",
                title:
                  "Czech Republic witnesses 27 per cent growth in Indian arrivals in 2017",
                link:
                  "http://www.expressbpd.com/travel/latest-updates-travel/czech-republic-witnesses-27-per-cent-growth-in-indian-arrivals-in-2017/406580/"
              },
              {
                date: "October 2018",
                source: "The Pie News",
                title: "Probitas Quad and VFS Global join forces",
                link:
                  "https://thepienews.com/news/probitas-quad-vfs-global-join-forces-student-verification/"
              },
              {
                date: "October 2018",
                source: "Arabian Business",
                title:
                  "DIFC-registered wills now cover $2.7bn real estate assets",
                link:
                  "https://www.arabianbusiness.com/news/405497-difc-registered-wills-now-cover-27bn-real-estate-assetshttps://www.arabianbusiness.com/news/405497-difc-registered-wills-now-cover-27bn-real-estate-assets"
              },
              {
                date: "September 2018",
                source: "Zawya",
                title:
                  "VFS TasHeel inaugurates centers across Indonesia to offer enhanced Visa and Biometric Enrollment services for Saudi visa applicants",
                link:
                  "https://www.zawya.com/mena/en/story/VFS_TasHeel_inaugurates_centers_across_Indonesia_for_Saudi_visa_applicants-ZAWYA20180925142025/"
              },
              {
                date: "September 2018",
                source: "Information Management",
                title:
                  "5 key lessons for organizations still struggling with GDPR: Barry Cook",
                link:
                  "https://www.information-management.com/opinion/5-key-lessons-for-organizations-still-struggling-with-gdpr?feed=0000015a-13e9-db87-a37b-d7ff2e140000"
              },
              {
                date: "September 2018",
                source: "The Indian Express",
                title:
                  "Delhi Govt’s doorstep delivery scheme: Here’s how it works",
                link:
                  "https://indianexpress.com/article/cities/delhi/hardlook-in-two-weeks-delhi-govts-doorstep-delivery-of-services-scheme-receives-over-20000-requests-5371053/"
              },
              {
                date: "September 2018",
                source: "The Times of India",
                title: "So far so good: Promise delivered at doorstep",
                link:
                  "https://timesofindia.indiatimes.com/city/delhi/so-far-so-good-promise-delivered-at-doorstep/articleshow/65926481.cms"
              },
              {
                date: "September 2018",
                source: "Politiko",
                title:
                  "Bataan Gov Garcia bares planned one-stop center for OFWs",
                link:
                  "http://centralluzon.politics.com.ph/bataan-gov-garcia-bares-planned-one-stop-center-for-ofws/"
              },
              {
                date: "September 2018",
                source: "The Guardian",
                title:
                  "'It's a revolution': Indian officials deliver public services at people's doorsteps",
                link:
                  "https://www.theguardian.com/global-development/2018/sep/17/india-officials-deliver-public-services-doorsteps"
              },
              {
                date: "September 2018",
                source: "Zawya",
                title:
                  "VFS Global opens new Joint Visa Application Centre in Riyadh",
                link:
                  "https://www.zawya.com/mena/en/story/VFS_Global_opens_new_Joint_Visa_Application_Centre_in_Riyadh-ZAWYA20180917115928/"
              },
              {
                date: "September 2018",
                source: "Arabian Business",
                title:
                  "Dubai's DIFC launches wills service for business owners",
                link:
                  "https://www.arabianbusiness.com/banking-finance/403734-dubais-difc-launches-wills-service-for-business-owners"
              },
              {
                date: "September 2018",
                source: "Business Standard",
                title:
                  "Czech Republic eyes 1 lakh footfalls from India by 2019-20",
                link:
                  "https://www.business-standard.com/article/pti-stories/czech-republic-eyes-1-lakh-footfalls-from-india-by-2019-20-118091600135_1.html"
              },
              {
                date: "September 2018",
                source: "Money Control",
                title:
                  "This global company is behind Delhi govt's plan to provide doorstep delivery of services",
                link:
                  "https://timesofindia.indiatimes.com/business/india-business/schengen-states-may-soon-offer-priority-visas-in-india/articleshow/65776106.cms"
              },
              {
                date: "September 2018",
                source: "The Times of India",
                title: "Schengen states may soon offer priority visas in India",
                link:
                  "https://timesofindia.indiatimes.com/business/india-business/schengen-states-may-soon-offer-priority-visas-in-india/articleshow/65776106.cms"
              },
              {
                date: "September 2018",
                source: "The Times of India",
                title: "At your service: Doorstep delivery makes debut",
                link:
                  "https://timesofindia.indiatimes.com/city/delhi/at-your-service-doorstep-delivery-makes-debut/articleshow/65760394.cms"
              },
              {
                date: "September 2018",
                source: "Business Standard",
                title:
                  "Manipur signs MoU with VFS Global for Citizen Facilitation",
                link:
                  "https://www.business-standard.com/article/pti-stories/manipur-signs-mou-with-vfs-global-for-citizen-facilitation-118090800367_1.html"
              },
              {
                date: "September 2018",
                source: "Rediff.com",
                title:
                  "How globe-trotting Indians are writing this firm's success story",
                link:
                  "http://www.rediff.com/business/report/how-globe-trotting-indians-are-writing-this-cos-success-story/20180906.htm"
              },
              {
                date: "September 2018",
                source: "Business Standard",
                title:
                  "Visa processing firm VFS Global is making India its passport to success",
                link:
                  "https://www.business-standard.com/article/companies/visa-processing-firm-vfs-global-is-making-india-its-passport-to-success-118090400172_1.html"
              },
              {
                date: "September 2018",
                source: "The Economic Times",
                title: "Applications for visa from tier-2 cities up 40%",
                link:
                  "https://economictimes.indiatimes.com/nri/visa-and-immigration/applications-for-visa-from-tier-2-cities-up-40/articleshow/65629297.cms"
              },
              {
                date: "September 2018",
                source: "The Times of India",
                title:
                  "40 services to be available at doorstep from September 10",
                link:
                  "https://timesofindia.indiatimes.com/city/delhi/40-services-to-be-available-at-doorstep-from-sept-10/articleshow/65629926.cms"
              },
              {
                date: "September 2018",
                source: "Khaleej Times",
                title:
                  "Succession planning made easy for businesses in Dubai, RAK",
                link:
                  "https://www.khaleejtimes.com/difc-wills-service-centre-launches-succession-planning-service"
              },
              {
                date: "August 2018",
                source: "Premium Times Nigeria",
                title:
                  "How we determine service charges, process visa for Nigerians – VFS Global",
                link:
                  "https://www.premiumtimesng.com/news/headlines/281060-interview-how-we-determine-service-charges-process-visa-for-nigerians-vfs-global.html"
              },
              {
                date: "August 2018",
                source: "The Hindu",
                title:
                  "India: Doorstep delivery of 40 govt services likely by September",
                link:
                  "https://www.thehindu.com/news/cities/Delhi/doorstep-delivery-of-40-govt-services-likely-by-september/article24740484.ece"
              },
              {
                date: "August 2018",
                source: "Travel Daily News",
                title:
                  "FCM expands in Middle East and Africa - Algeria and Kuwait join regional network",
                link:
                  "https://www.traveldailynews.com/post/fcm-expands-in-middle-east-and-africa-algeria-and-kuwait-join-regional-network"
              },
              {
                date: "August 2018",
                source: "IOL",
                title: "Ukraine visa services expand in Africa",
                link:
                  "https://www.iol.co.za/news/africa/ukraine-visa-services-expand-in-africa-16583657"
              },
              {
                date: "August 2018",
                source: "Independent.ie",
                title: "Ireland keen to build on the Gulf business stream",
                link:
                  "https://www.independent.ie/business/in-the-workplace/ireland-keen-to-build-on-the-gulf-business-stream-37207154.html"
              },
              {
                date: "August 2018",
                source: "Money Control",
                title:
                  "Organisations 'borrow' personal data, not at liberty to use it as they wish, says Barry Cook of VFS Global",
                link:
                  "https://www.moneycontrol.com/news/technology/organisations-borrow-personal-data-not-at-liberty-to-use-it-as-they-wish-says-barry-cook-of-vfs-global-2826431.html"
              },
              {
                date: "August 2018",
                source: "DNA India",
                title:
                  "Data protection law will be a big boost to outsourcing and data processing industry",
                link:
                  "https://www.dnaindia.com/business/report-data-protection-law-will-be-a-big-boost-to-outsourcing-and-data-processing-industry-2647880"
              },
              {
                date: "August 2018",
                source: "Hotelier Middle East",
                title:
                  "GCC travellers favour EU countries for summer travel, data finds",
                link:
                  "http://www.hoteliermiddleeast.com/34106-gcc-travellers-favour-eu-countries-for-summer-travel-data-finds/"
              },
              {
                date: "July 2018",
                source: "The Peninsula",
                title:
                  "VFS Global expands office after rise in demand for Turkish visas",
                link:
                  "http://www.hoteliermiddleeast.com/34106-gcc-travellers-favour-eu-countries-for-summer-travel-data-finds/"
              },
              {
                date: "July 2018",
                source: "Asian Voice",
                title: "Indian tourists visiting UK on the rise",
                link:
                  "https://www.asian-voice.com/News/UK/Indian-tourists-visiting-the-UK-on-rise"
              },
              {
                date: "July 2018",
                source: "The Times of India",
                title: "Indian globetrotters on the rise, says VFS Global",
                link:
                  "https://timesofindia.indiatimes.com/business/india-business/indian-globetrotters-on-the-rise-says-vfs-global/articleshow/65104563.cms"
              },
              {
                date: "July 2018",
                source: "Zawya",
                title:
                  "VFS Global opens Ukraine visa application centres in Riyadh, Jeddah in KSA",
                link:
                  "https://www.zawya.com/mena/en/story/VFS_Global_opens_Ukraine_visa_application_centres_in_Riyadh_Jeddah_in_KSA-ZAWYA20180718103327/"
              },
              {
                date: "July 2018",
                source: "Magnum Vacation",
                title:
                  "Ireland opens new visa application centre in United Arab Emirates",
                link:
                  "http://www.magnumvacation.com/blog/travels/ireland-opens-new-visa-application-centre-in-united-arab-emirates-news/"
              },
              {
                date: "July 2018",
                source: "Times of India",
                title:
                  "Flying Emirates? Pay less for some UAE tourist visa from July 1",
                link:
                  "https://timesofindia.indiatimes.com/business/india-business/flying-emirates-pay-less-for-some-uae-tourist-visa-from-july-1/articleshow/64936745.cms"
              },
              {
                date: "July 2018",
                source: "Zawya",
                title:
                  "Dubai FDI partners with VFS Global to ease foreign investors licensing",
                link:
                  "https://www.zawya.com/mena/en/story/Dubai_FDI_partners_with_VFS_Global_to_ease_foreign_investors_licensing-ZAWYA20180703075220/"
              },
              {
                date: "July 2018",
                source: "Diplomat",
                title: "Visa Solutions",
                link: "http://www.diplomatmagazine.com/visa-solutions/"
              },
              {
                date: "July 2018",
                source: "Times of India",
                title:
                  "No more queuing up: By August, 100 services at your doorstep",
                link:
                  "https://timesofindia.indiatimes.com/city/delhi/no-more-queuing-up-by-august-100-services-at-your-doorstep/articleshow/64847481.cms"
              },
              {
                date: "June 2018",
                source: "The Economic Times",
                title:
                  "Visa power: Countries ease rules to roll out red carpet for Indian tourists",
                link:
                  "https://economictimes.indiatimes.com/nri/visa-and-immigration/visa-power-countries-ease-rules-to-roll-out-red-carpet-for-indian-tourists/articleshow/64674835.cms"
              },
              {
                date: "June 2018",
                source: "Business Standard",
                title: "Zimbabwe targets 16,000 Indian travellers by 2021",
                link:
                  "https://www.business-standard.com/article/pti-stories/zimbabwe-targets-16-000-indian-travellers-by-2021-118061400698_1.html"
              },
              {
                date: "June 2018",
                source: "Khaleej Times",
                title: "GDPR to trigger change in Mideast travel trade",
                link:
                  "https://www.khaleejtimes.com/business/local/gdpr-to-trigger-change-in-mideast-travel-trade"
              },
              {
                date: "June 2018",
                source: "Kyiv Post",
                title:
                  "Ukraine planning to open 56 new visa centers abroad by Aug. 1",
                link:
                  "https://www.kyivpost.com/ukraine-politics/ukraine-planning-to-open-56-new-visa-centers-abroad-by-aug-1.html"
              },
              {
                date: "June 2018",
                source: "Vanguard,",
                title: "Czech Republic opens Cebu visa center",
                link:
                  "http://www.ptvnews.ph/czech-republic-opens-cebu-visa-center/"
              },
              {
                date: "June 2018",
                source: "Web India123",
                title:
                  "UK Visa applicants in Kochi can submit app from VFS Global's Premium longue",
                link:
                  "https://news.webindia123.com/news/Articles/India/20180608/3362676.html"
              },
              {
                date: "June 2018",
                source: "Vanguard",
                title:
                  "VFS Global committed to professional standards: SMS services are optional for all applicants",
                link:
                  "https://www.vanguardngr.com/2018/06/vfs-global-committed-to-professional-standards-sms-services-are-optional-for-all-applicants/"
              },
              {
                date: "May 2018",
                source: "News Barons",
                title:
                  "VFS Global among 15% of global companies to be already GDPR compliant",
                link:
                  "https://www.newsbarons.com/international-news/vfs-global-among-15-of-global-companies-to-be-already-gdpr-compliant/"
              },
              {
                date: "May 2018",
                source: "Acrofan",
                title:
                  "The President of Russia Vladimir Putin Has Received a FAN ID",
                link: "https://us.acrofan.com/detail.php?number=81096"
              },
              {
                date: "April 2018",
                source: "TMC NEWS",
                title:
                  "Yas Experiences appoints VFS Global as official representative in India",
                link: "https://www.tmcnet.com/usubmit/2018/04/26/8742708.htm"
              },
              {
                date: "April 2018",
                source: "Gulf News",
                title: "Here is what can ruin your summer trip",
                link:
                  "https://gulfnews.com/news/uae/tourism/here-is-what-can-ruin-your-summer-trip-1.2209217"
              },
              {
                date: "April 2018",
                source: "Gulf News",
                title: "German envoy opens new visa facility",
                link:
                  "http://www.gulf-times.com/story/589183/German-envoy-opens-new-visa-facility"
              },
              {
                date: "April 2018",
                source: "YaHind",
                title:
                  "VFS TasHeel lends its support during Parkinson's awareness month",
                link:
                  "http://www.yahind.com/vfs-tasheel-and-movement-mantra-hold-indoor-cricket-tournament-in-support-of-parkinsons-awareness-month/"
              },
              {
                date: "April 2018",
                source: "Zawya",
                title:
                  "VFS Global Launches One-Stop Visa Centres for Malaysia in Riyadh, Jeddah in KSA",
                link:
                  "https://www.zawya.com/mena/en/story/VFS_Global_Launches_OneStop_Visa_Centres_for_Malaysia_in_Riyadh_Jeddah_in_KSA-ZAWYA20180412145808/"
              },
              {
                date: "April 2018",
                source: "Colombo Page",
                title:
                  "VFS Global launches two new visa services for UK visa applicants in Sri Lanka",
                link:
                  "http://www.colombopage.com/archive_18A/Apr11_1523457896CH.php"
              },
              {
                date: "April 2018",
                source: "Zawya",
                title:
                  "German Embassy opens Visa Application Centre in Bahrain in partnership with VFS Global",
                link:
                  "https://www.zawya.com/mena/en/story/German_Embassy_opens_Visa_Application_Centre_in_Bahrain_in_partnership_with_VFS_Global-ZAWYA20180409135221/"
              },
              {
                date: "April 2018",
                source: "Middle East Monitor",
                title: "France places new visa procedures for Algerians",
                link:
                  "https://www.middleeastmonitor.com/20180410-france-places-new-visa-procedures-for-algerians/"
              },
              {
                date: "April 2018",
                source: "ADVFN",
                title:
                  "VFS Global Expands Finland Visa Services Network to Hong Kong",
                link:
                  "https://www.advfn.com/news_VFS-Global-Expands-Finland-Visa-Services-Network-t_77138239.html"
              },
              {
                date: "April 2018",
                source: "Travel Press",
                title: "VFS Global launches new service",
                link:
                  "https://www.travelpress.com/vfs-global-launches-new-service/#.WsYB-H9-zIU"
              },
              {
                date: "April 2018",
                source: "Business Insider",
                title:
                  "Czech Visa Application Centres launched in Changsha, Jinan, and Fuzhou in P. R. China",
                link:
                  "http://markets.businessinsider.com/news/stocks/czech-visa-application-centres-launched-in-changsha-jinan-and-fuzhou-in-p-r-china-1019405527"
              },
              {
                date: "April 2018",
                source: "Radio Islam",
                title: "Umrah & Hajj Visa Biometrics Office opened in Durban",
                link:
                  "http://www.radioislam.org.za/a/index.php/latest-news/23259-umrah-hajj-visa-biometrics-office-opened-in-durban.html"
              },
              {
                date: "March 2018",
                source: "Breaking Travel News",
                title:
                  "VFS Global rolls-out improved UK visa service for United States travellers",
                link:
                  "http://www.breakingtravelnews.com/news/article/vfs-rolls-out-improved-uk-visa-service-for-united-states-travellers/"
              },
              {
                date: "March 2018",
                source: "The Property Times",
                title:
                  "Indian investments in Dubai can now be protected through a Will registration system operated by Dubai’s international commercial courts and supported by VFS Global",
                link:
                  "http://thepropertytimes.in/indian-investments-dubai-can-now-protected-will-registration-system-operated-dubais-international-commercial-courts-supported-vfs-global/"
              },
              {
                date: "March 2018",
                source: "Uzbekistan Today",
                title:
                  "Applications for a visa to Latvia, Estonia, Lithuania and Switzerland can be obtained at the Tashkent office of VFS Global",
                link:
                  "http://ut.uz/en/tourism/applications-for-a-visa-to-latvia-estonia-lithuania-and-switzerland-can-be-obtained-at-the-tashkent-/"
              },
              {
                date: "March 2018",
                source: "PR News Wire",
                title:
                  "VFS Global Awarded Contracts to Provide Canadian Visa Application Centre Services in 78 Countries",
                link:
                  "https://www.prnewswire.com/news-releases/vfs-global-awarded-contracts-to-provide-canadian-visa-application-centre-services-in-78-countries-677235483.html"
              },
              {
                date: "March 2018",
                source: "PR News Wire",
                title:
                  "VFS Global Acquires Middle Eastern FMC Partner Al Etimad",
                link:
                  "https://www.prnewswire.com/news-releases/vfs-global-acquires-middle-eastern-fmc-partner-al-etimad-676542713.html"
              },
              {
                date: "March 2018",
                source: "PR News Wire",
                title: "VFS Global to Take Over Full Ownership of VFS TasHeel",
                link:
                  "http://www.prnewswire.co.uk/news-releases/vfs-global-to-take-over-full-ownership-of-vfs-tasheel-676543173.html"
              },
              {
                date: "March 2018",
                source: "The New Indian Express",
                title:
                  "Assets in Dubai? Get your will done to pass them on to chosen beneficiaries",
                link:
                  "http://www.newindianexpress.com/states/kerala/2018/mar/07/assets-in-dubai-get-your-will-done-to-pass-them-on-to-chosen-beneficiaries-1783157.html"
              },
              {
                date: "March 2018",
                source: "News Barons",
                title:
                  "To protect Indian investment in UAE, Dubai government starts initiative of ‘virtual registry’",
                link:
                  "https://www.newsbarons.com/business/to-protect-indian-investment-in-uae-dubai-government-starts-initiative-of-virtual-registry/"
              },
              {
                date: "February 2018",
                source: "The Gulf Today",
                title: "MoH launches medical centre in Ibn Battuta Mall",
                link:
                  "http://gulftoday.ae/portal/3ad06752-fb80-4ca4-95c7-2b17c814a29c.aspx"
              },
              {
                date: "February 2018",
                source: "The Daily News Nation",
                title: "UK brings visa services at much closer to home",
                link:
                  "http://thedailynewnation.com/news/165622/uk-brings-visa-services-at-much-closer-to-home.html/"
              },
              {
                date: "February 2018",
                source: "Travel and Hospitality",
                title:
                  "VFS Global launches new centre on behalf of Cyprus in Goa",
                link:
                  "http://www.tnhglobal.com/vfs-global-launches-new-centre-on-behalf-of-cyprus-in-goa/"
              },
              {
                date: " February 2018",
                source: "Trade Arabia",
                title: "Italy renews partnership with VFS Global",
                link: "http://tradearabia.com/news/TTN_336876.html"
              },
              {
                date: "February 2018",
                source: "Gulf Times",
                title: "German embassy opens new visa application centre",
                link:
                  "http://www.gulf-times.com/story/582200/German-embassy-opens-new-visa-application-centre"
              },
              {
                date: "February 2018",
                source: "TravTalk",
                title: "VFS Global aims 100 governments",
                link: "http://travtalkindia.com/pdf/2018/TTFeb1st18.pdf"
              },
              {
                date: "February 2018",
                source: "Khaleej Times",
                title: "More Indian expats protect wealth with DIFC Wills",
                link:
                  "https://insight.carma.com/a/67d8141c-f7a4-4c89-8070-9c108f355e49"
              },
              {
                date: "February 2018",
                source: "Zululand Observer",
                title: "Zimbabwean Exemption Permit applications extended",
                link:
                  "https://zululandobserver.co.za/164392/zimbabwean-exemption-permit-applications-extended/"
              },
              {
                date: "February 2018",
                source: "DNA",
                title: "State government to outsource front office ops of RTOs",
                link:
                  "http://www.dnaindia.com/ahmedabad/report-state-government-to-outsource-front-office-ops-of-rtos-2582614"
              },
              {
                date: "February 2018",
                source: "Medium",
                title:
                  "Here’s why the Estonian Police and Border Guard Board now has a presence in South Korea",
                link:
                  "https://medium.com/e-residency-blog/heres-why-the-estonian-police-and-border-guard-board-now-has-a-presence-in-south-korea-ead9b3dc8387"
              },
              {
                date: "February 2018",
                source: "International Travel News",
                title: "Brazil gets over 600 e-Visa applications from US",
                link:
                  "http://www.internationaltravelnews.com/news/256330830/brazil-gets-over-600-e-visa-applications-from-us"
              },
              {
                date: "January 2018",
                source: "ENCA",
                title: "SA extends deadline for Zim permit document submission",
                link:
                  "http://www.enca.com/south-africa/sa-extends-daedline-for-zim-permit-document-submission"
              },
              {
                date: "January 2018",
                source: "RT",
                title:
                  "Russia 2018 FIFA World Cup: Extra FAN ID delivery centers open across Europe",
                link:
                  "https://www.rt.com/sport/417306-fan-id-european-collection-centers/"
              },
              {
                date: "January 2018",
                source: "TNH Global",
                title:
                  "VFS Global now accepts visa applications for Ukraine in India",
                link:
                  "http://www.tnhglobal.com/vfs-global-now-accepts-visa-applications-for-ukraine-in-india/"
              },
              {
                date: "January 2018",
                source: "India Today",
                title:
                  "Visa application centre of Czech Republic launched in Panaji",
                link:
                  "https://www.indiatoday.in/pti-feed/story/visa-application-centre-of-czech-republic-launched-in-panaji-1148839-2018-01-18"
              },
              {
                date: "January 2018",
                source: "Travel Biz Monitor",
                title: "Hope dawns after shaky times: Forecast 2018",
                link:
                  "http://www.travelbizmonitor.com/Features/hope-dawns-after-shaky-times-forecast-2018-34705"
              },
              {
                date: "January 2018",
                source: "People Matters",
                title:
                  "A Trained Employee, A Lucrative Investment – Mr Bernard Martyris",
                link:
                  "https://www.peoplematters.in/article/training/a-trained-employee-a-lucrative-investment-17058"
              },
              {
                date: "January 2018",
                source: "Fox 34",
                title:
                  "VFS Global to Process Germany Visas in 10 New Countries",
                link:
                  "http://www.fox34.com/story/37180430/vfs-global-to-process-germany-visas-in-10-new-countries"
              }
            ]
          },
          {
            year: "2017",
            content: [
              {
                title:
                  "Residents with registered wills to receive free verification services -\nDIFC Wills & Probate Registry signs partnership with VFS Global",
                link:
                  "http://gulfnews.com/news/uae/society/residents-with-registered-wills-to-receive-free-verification-services-1.2120966",
                source: "Gulf News",
                date: "November 2017"
              },
              {
                title:
                  "Russia has presented a new FAN ID design for the 2018 FIFA World Cup",
                link:
                  "https://www.multivu.com/players/uk/8211651-russia-fan-id-design-2018-fifa-world-cup/",
                source: "MultiVu",
                date: "November 2017"
              },
              {
                title:
                  "Dubai Economy signs partnership with VFS Global to provide business registration services worldwide",
                link:
                  "https://www.menaherald.com/en/business/events-services/dubai-economy-signs-partnership-vfs-global-provide-business-registration",
                source: "MENA Herald",
                date: "October 2017"
              },
              {
                title:
                  "VFS Global Edu Support Services partners with Oxademy to launch World’s first ‘AI-based’ online learning programs for students",
                link:
                  "http://bweducation.businessworld.in/article/VFS-Edu-Support-Services-partners-with-Oxademy-to-launch-World-s-first-AI-based-online-learning-programs-for-students/26-07-2017-122821/",
                source: "Business World Education",
                date: "July 2017"
              },
              {
                title:
                  "Czech Republic envoy inaugurates visa application centre",
                link:
                  "http://www.dnaindia.com/business/report-czech-republic-envoy-inaugurates-visa-application-centre-2493264\t",
                source: "Daily News & Analysis",
                date: "July 2017"
              },
              {
                title: "Germany Visa Application Centre opened in Bengaluru",
                link:
                  "http://www.thehindubusinessline.com/news/germany-visa-application-centre-opened-in-bengaluru/article9736203.ece",
                source: "The Hindu Business Line",
                date: "June 2017"
              },
              {
                title: "Confed Cup: Entry into Russia is made easier",
                link:
                  "http://sportbild.bild.de/fussball/nationalmannschaft/nationalmannschaft/confed-cup-einreise-russland-visum-51888334.sport.html",
                source: "Sport Bild",
                date: "May 2017"
              },
              {
                title: "Netherlands visa centre opens in Abu Dhabi",
                link:
                  "http://gulfnews.com/news/uae/society/netherlands-visa-centre-opens-in-abu-dhabi-1.2031511",
                source: "Gulf News",
                date: "May 2017"
              },
              {
                title:
                  "Summer travel rush to spur rise in visa applications in UAE",
                link:
                  "http://gulfnews.com/business/visas/summer-travel-rush-to-spur-rise-in-visa-applications-in-uae-1.2031472",
                source: "Gulf News",
                date: "May 2017"
              },
              {
                title:
                  "VFS Global opens Czech Republic's 13<sup>th</sup> visa application centre",
                link:
                  "http://www.business-standard.com/article/pti-stories/vfs-global-opens-czech-republic-s-13th-visa-application-centre-117050801192_1.html",
                source: "Business Standard",
                date: "May 2017"
              },
              {
                title: "Gulf Air, VFS Global ink partnership agreement",
                link:
                  "http://www.bahrainnewsgazette.com/gulf-air-vfs-global-ink-partnership-agreement/",
                source: "Bahrain News Gazette",
                date: "April 2017"
              },
              {
                title:
                  "Global Talent Mobility Considerations in a VUCA Economy: Thoughts from VFS Global",
                link:
                  "http://www.hrinasia.com/people-development/global-talent-mobility-considerations-in-a-vuca-economy-thoughts-from-vfs-global/",
                source: "HR IN ASIA",
                date: "April 2017"
              },
              {
                title:
                  "New UK Visa Application Centre formally inaugurated in Pune today",
                link:
                  "http://nrinews24x7.com/new-uk-visa-application-centre-formally-inaugurated-in-pune-today/",
                source: "Nri News",
                date: "March 2017"
              },
              {
                title: "UK visa application centre inaugurated in Ahmedabad",
                link:
                  "https://www.gov.uk/government/world-location-news/uk-visa-application-centre-inaugurated-in-ahmedabad",
                source: "Gov.UK",
                date: "March 2017"
              },
              {
                title: "Czech Republic’s visa centre inaugurated",
                link:
                  "http://www.sakaaltimes.com/NewsDetails.aspx?NewsId=4851987284480026329&SectionId=5171561142064258099&SectionName=Pune&NewsDate=20170324&NewsTitle=Czech Republic’s visa centre inaugurated",
                source: "Sakal Times",
                date: "March 2017"
              },
              {
                title:
                  "British Deputy High Commissioner opens new VFS Global Visa Application Centre in Ahmedabad",
                link:
                  "http://deshgujarat.com/2017/03/22/british-deputy-high-commissioner-opens-new-vfs-global-visa-application-centre-in-ahmedabad/",
                source: "DeshGujarat",
                date: "March 2017"
              },
              {
                title: "Czech Republic opens visa centre in Jaipur",
                link:
                  "http://epaperbeta.timesofindia.com/Article.aspx?eid=31810&articlexml=Czech-Republic-opens-visa-centre-in-Jaipur-03032017011079",
                source: "The Times of India",
                date: "March 2017"
              },
              {
                title: "New joint visa application centre opened in Pune",
                link:
                  "http://www.business-standard.com/article/pti-stories/new-joint-visa-application-centre-opened-in-pune-117022700900_1.html",
                source: "Business Standard",
                date: "February 2017"
              },
              {
                title:
                  "China launches new visa application service centre in New Delhi",
                link:
                  "http://economictimes.indiatimes.com/nri/visa-and-immigration/china-launches-new-visa-application-service-centre-in-new-delhi/articleshow/57330840.cms",
                source: "The Economic Times",
                date: "February 2017"
              },
              {
                title: "Japan Visa Application Centre opened in Colombo",
                link:
                  "http://www.island.lk/index.php?page_cat=article-details&page=article-details&code_title=160585",
                source: "The Island",
                date: "February 2017"
              },
              {
                title:
                  "New South African visa application centres to make life easier for Aucklanders",
                link:
                  "http://www.stuff.co.nz/travel/kiwi-traveller/89356078/new-south-african-visa-application-centres-to-make-life-easier-for-aucklanders",
                source: "Stuff",
                date: "February 2017"
              },
              {
                title:
                  "VFS Global is expanding the network of Russian visa centers in 14 countries",
                link: "http://ratanews.ru/news/news_10022017_5.stm",
                source: "Rata News",
                date: "February 2017"
              },
              {
                title:
                  "VFS Global wins contract to manage India visas in Spain",
                link:
                  "http://www.europapress.es/turismo/mundo/noticia-vfs-global-gestionara-visados-india-espana-20170207145833.html",
                source: "Europa press",
                date: "February 2017"
              },
              {
                title: "Russia Visa Application Centre launched in Dubai",
                link:
                  "http://www.khaleejtimes.com/nation/dubai/russia-visa-application-centre-launches-in-dubai",
                source: "Khaleej Times",
                date: "January 2017"
              },
              {
                title: "Apply for visas to Belgium in Abu Dhabi",
                link:
                  "http://gulftoday.ae/portal/82c074e3-5d2a-4219-ba32-6d2e6f107568.aspx",
                source: "The Gulf Today",
                date: "January 2017"
              },
              {
                title: "Czech Republic embassy opens visa centre in Ahmedabad",
                link:
                  "http://indianexpress.com/article/india/czech-republic-embassy-opens-visa-centre-in-ahmedabad-4466336/",
                source: "Indian Express",
                date: "January 2017"
              }
            ]
          },
          {
            year: "2016",
            content: [
              {
                title: "Dedicated Indian visa office launched in Johannesburg",
                link:
                  "http://www.business-standard.com/article/pti-stories/dedicated-indian-visa-office-launched-in-johannesburg-116112201408_1.html",
                source: "Business Standard",
                date: "November 2016"
              },
              {
                title:
                  "Australia, UK High Commissions open new Visa Application Centre in Colombo",
                link:
                  "http://www.lankabusinessonline.com/australia-uk-high-commissions-open-new-visa-application-centre-in-colombo/",
                source: "Lanka Business Online",
                date: "November 2016"
              },
              {
                title:
                  "New application centre for Turkey visa opens in Doha, Qatar",
                link:
                  "http://www.gulf-times.com/story/520037/New-application-centre-for-Turkey-visa-opens-in-Do",
                source: "Gulf Times",
                date: "November 2016"
              },
              {
                title: "VFS Global introduces mobile app for UAE visas",
                link:
                  "http://traveltrendstoday.in/news1/international/item/4519-vfs-global-introduces-mobile-app-for-uae-visas",
                source: "Travel Trends Today",
                date: "November 2016"
              },
              {
                title:
                  "What Nigerians should know about visas issuance – VFS Global",
                link:
                  "http://www.vanguardngr.com/2016/11/nigerians-know-visas-issuance-vfs/",
                source: "Vanguard",
                date: "November 2016"
              },
              {
                title: "French embassy to get visa applications via VFS Global",
                link:
                  "http://www.muscatdaily.com/Archive/Oman/French-embassy-to-get-visa-applications-via-VFS-Global-4up8",
                source: "Muscat Daily",
                date: "November 2016"
              },
              {
                title:
                  "Award of distinction honours Zubin Karkaria CEO of VFS Global by TAAI",
                link:
                  "http://www.uspa24.com/bericht-9602/award-of-distinction-honours-zubin-karakaria-ceo-of-vfs-global-by-taai.html",
                source: "USPA News",
                date: "October 2016"
              },
              {
                title: "Two more passport attestation centres",
                link:
                  "http://www.thehindu.com/news/cities/Thiruvananthapuram/two-more-passport-attestation-centres/article9218243.ece",
                source: "The Hindu",
                date: "October 2016"
              },
              {
                title: "Home Affairs warns over visa, permits scams",
                link: "http://travel.iafrica.com/about/about-us/",
                source: "iafrica.com",
                date: "October 2016"
              },
              {
                title:
                  "VFS Global and applications for Schengen visas to Norway",
                link:
                  "http://www.al-norwige.org.sa/studywork/visaandresidence/VFS-Global-and-applications-for-Schengen-visas-to-Norway/#.WAcwjhJFqJ-",
                source: "Royal Norwegian Embassy, Riyadh",
                date: "October 2016"
              },
              {
                title:
                  "Swiss, Croatia joint visa application centre moves to new location",
                link:
                  "http://www.gulf-times.com/story/516650/Swiss-Croatia-joint-visa-application-centre-moves-",
                source: "Gulf Times",
                date: "October 2016"
              },
              {
                title: "Turkey to outsource visa processing",
                link:
                  "https://www.thepeninsulaqatar.com/article/07/10/2016/Turkey-to-outsource-visa-processing",
                source: "The Peninsula",
                date: "October 2016"
              },
              {
                title:
                  "VFS Global to continue to process Schengen visa for Spain",
                link:
                  "http://tourismbreakingnews.com/vfs-global-not-to-process-spanish-visa-from-oct-11/",
                source: "Tourism Breaking News",
                date: "October 2016"
              },
              {
                title:
                  "Turkish ministry woos Indian tourists promising safety and security",
                link:
                  "http://www.newindianexpress.com/cities/hyderabad/2016/oct/04/turkish-ministry-woos-indian-tourists-promising-safety-and-security-1524893.html?pm=183",
                source: "New Indian Express",
                date: "October 2016"
              },
              {
                title: "Passport to Success",
                link: "https://www.docdroid.net/8bZ04gi/lunch-with-bs.pdf.html",
                source: "Business Standard",
                date: "October 2016"
              },
              {
                title: "Operation of Cyprus Visa Application Centre in Tehran",
                link:
                  "http://famagusta-gazette.com/operation-of-cyprus-visa-application-centre-in-tehran-p36428-69.htm",
                source: "Famagusta Gazette",
                date: "September 2016"
              },
              {
                title:
                  "Qatar announces easier entry for Cruise passengers as 32 ships head to Doha port",
                link:
                  "http://www.incentivetravel.co.uk/news/cruise/35327-qatar-announces-easier-entry-for-cruise-passengers-as-32-ships-head-to-doha-port",
                source: "ITCM",
                date: "September 2016"
              },
              {
                title:
                  "Why business needs to focus on disabled, pregnant women and senior citizens",
                link:
                  "http://www.moneylife.in/article/why-business-needs-to-focus-on-disabled-pregnant-women-and-senior-citizens/48132.html ",
                source: "Money Life",
                date: "September 2016"
              },
              {
                title: "Macau committed to becoming world class destination",
                link:
                  "http://www.thejakartapost.com/news/2016/09/13/macau-committed-becoming-world-class-destination.html",
                source: "The Jakarta Post",
                date: "September 2016"
              },
              {
                title: "Closing date for visas extended",
                link:
                  "http://www.news24.com/SouthAfrica/Local/Express-News/closing-date-for-visas-extended-20160913",
                source: "news24",
                date: "September 2016"
              },
              {
                title: "VFS Global launches Cyprus visa service in Amman",
                link: "http://www.tradearabia.com/news/TTN_313005.html",
                source: "Trade Arabia",
                date: "September 2016"
              },
              {
                title:
                  "Qatar partners VFS Global to launch improved visa processes",
                link: "http://ttgasia.com/article.php?article_id=27908",
                source: "TTG Asia",
                date: "September 2016"
              },
              {
                title:
                  "Russians, Chinese and Indians to get visas on arrival in Qatar",
                link:
                  "http://www.gulf-times.com/story/510160/Russians-Chinese-and-Indians-to-get-visas-on-arriv",
                source: "Gulf Times",
                date: "August 2016"
              },
              {
                title:
                  "Italy Visa Application Centre moves to more central location in Amman for added convenience to applicants",
                link: "http://www.zawya.com/mena/en/story/ZAWYA20160802064117/",
                source: "Zawya",
                date: "August 2016"
              },
              {
                title: "UK visa application centre to extend opening hours",
                link:
                  "http://bt.com.bn/news-national/2016/07/30/uk-visa-application-centre-extend-opening-hours#sthash.Vn1rHM3Z.RC0rJKL1.dpbs",
                source: "The Brunei Times",
                date: "July 2016"
              },
              {
                title:
                  "Turkey Visa Application Centre inaugurated in Mumbai, India",
                link:
                  "http://www.tnhglobal.com/turkey-visa-application-centre-inaugurated-in-mumbai-india/",
                source: "TNH Global",
                date: "July 2016"
              },
              {
                title:
                  "Azerbaijani citizens can get visas to Latvia, Lithuania and other countries in Baku visa center",
                link: "http://en.trend.az/azerbaijan/society/2552407.html",
                source: "Trend News Agency",
                date: "July 2016"
              },
              {
                title:
                  "Lesotho: Home Affairs Extends Closing Date of Applications for Lesotho Special Permits",
                link: "http://allafrica.com/stories/201606290433.html",
                source: "AllAfrica",
                date: "June 2016"
              },
              {
                title:
                  "Czech Republic visa application centre launched in B'luru",
                link:
                  "http://www.business-standard.com/article/pti-stories/czech-republic-visa-application-centre-launched-in-b-luru-116061601188_1.html",
                source: "Business Standard",
                date: "June 2016"
              },
              {
                title:
                  "VFS Global inaugurates UK visa application centre in Northern Thailand",
                link:
                  "https://12go.asia/en/post/1692/vfs-inaugurates-uk-visa-application-centre-in-northern-thailand",
                source: "12GO Asia",
                date: "June 2016"
              },
              {
                title:
                  "Visa Application Centers Speeding Up Process for Travel to UK",
                link:
                  "http://www.travelpulse.com/news/destinations/visa-application-centers-speeding-up-process-for-travel-to-uk.html",
                source: "Travel Pulse",
                date: "June 2016"
              },
              {
                title:
                  "Two Greek Visa Centers in Moscow, Russia to stay open during weekends",
                link:
                  "http://www.tornosnews.gr/en/tourism-businesses/markets/16503-two-greek-visa-centers-in-moscow-to-stay-open-during-weekends.html",
                source: "Tornos News",
                date: "June 2016"
              },
              {
                title: "Czech Republic opens five new visa centers in China",
                link: "http://www.globaltimes.cn/content/987191.shtml",
                source: "Global Times",
                date: "June 2016"
              },
              {
                title:
                  "VFS Global appoints Peter Brun as Chief Communications Officer",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/vfs-global-appoints-peter-brun-as-chief-communications-officer-30570",
                source: "Travel Biz Monitor",
                date: "May 2016"
              },
              {
                title:
                  "First Latvian visa application center in China opened in Beijing",
                link:
                  "http://www.baltic-course.com/eng/good_for_business/?doc=121075",
                source: "Baltic-course",
                date: "May 2016"
              },
              {
                title:
                  "New Australian and UK Visa Application Centre opens in Thimphu",
                link:
                  "http://www.business-standard.com/article/news-ani/new-australian-and-uk-visa-application-centre-opens-in-thimphu-116051900387_1.html",
                source: "Business Standard",
                date: "May 2016"
              },
              {
                title:
                  "Minister Gigaba urges Lesotho nationals in SA to apply for special permit to stay on legally",
                link:
                  "http://www.timeslive.co.za/politics/2016/05/10/Minister-Gigaba-urges-Lesotho-nationals-in-SA-to-apply-for-special-permit-to-stay-on-legally",
                source: "Times Live",
                date: "May 2016"
              },
              {
                title:
                  "Breaking Travel News interview: Zubin Karkaria, chief executive, Kuoni Group & VFS Global",
                link:
                  "http://www.breakingtravelnews.com/focus/article/breaking-travel-news-interview-zubin-karkaria-chief-executive-kuoni-group/",
                source: "Breaking Travel News",
                date: "May 2016"
              },
              {
                title:
                  "Lithuania opens five new VFS Global Lithuania Visa Application Centres in China",
                link:
                  "https://www.urm.lt/default/en/news/lithuania-opens-five-new-vfs-lithuania-visa-application-centres-in-china",
                source:
                  "Ministry of Foreign Affairs of the Republic of Lithuania",
                date: "April 2016"
              },
              {
                title:
                  "Visa processing will continue to be growth driver for VFS Global",
                link:
                  "http://www.khaleejtimes.com/business/local/visa-processing-will-continue-to-be-growth-driver-for-vfs-global",
                source: "Khaleej Times",
                date: "April 2016"
              },
              {
                title: "New Visa Application Center in Nanjing",
                link:
                  "http://www.swedenabroad.com/en-GB/Embassies/Shanghai/Current-affairs/News/New-Visa-Application-Center-in-Nanjing-sys/",
                source: "Consulate General of Sweden, Shanghai",
                date: "April 2016"
              },
              {
                title:
                  "Want a visa? New VFS Global service provides chauffeur facility & form-filling assistance for customers!",
                link:
                  "http://economictimes.indiatimes.com/articleshow/51836551.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst",
                source: "The Economic Times",
                date: "April 2016"
              },
              {
                title: "UK visa application centre to open in Thimphu",
                link:
                  "http://www.kuenselonline.com/uk-visa-application-centre-to-open-in-thimphu/",
                source: "Kuensel",
                date: "April 2016"
              },
              {
                title:
                  "VFS Global launches visa application services for Latvia in three cities in the United Kingdom",
                link:
                  "http://www.travpr.com/pr-51189-vfs-global-launches-visa.html",
                source: "TravPR",
                date: "April 2016"
              },
              {
                title: "Cyprus visa application centre launched in Abu Dhabi",
                link: "http://www.tradearabia.com/news/TTN_304500.html",
                source: "Trade Arabia",
                date: "April 2016"
              },
              {
                title: "Now, get a UK visa from home",
                link:
                  "http://timesofindia.indiatimes.com/india/Now-get-a-UK-visa-from-home/articleshow/51706105.cms",
                source: "The Times of India",
                date: "April 2016"
              },
              {
                title:
                  "New visa application centre launched for the Netherlands in Kuwait City",
                link:
                  "http://www.gulfnews247.com/2016/04/05/new-visa-application-centre-launched-for-the-netherlands-in-kuwait-city/",
                source: "Gulf News 24/7",
                date: "April 2016"
              },
              {
                title: "Visa applications - VFS Global",
                link:
                  "http://www.swedenabroad.com/en-GB/Embassies/Abuja/Current-affairs/News/Visa-applications---VFS-Global-sys/",
                source: "Embassy of Sweden in Abuja",
                date: "April 2016"
              },
              {
                title: "New centre for visa application to China presented",
                link:
                  "http://www.portalangop.co.ao/angola/en_us/noticias/politica/2016/3/13/New-centre-for-visa-application-China-presented,a2c41f3d-8cdf-4ffd-93da-58efd9f4bd2f.html",
                source: "ANGOP",
                date: "April 2016"
              },
              {
                title:
                  "Latvian embassy in UK launches cooperation with VFS Global",
                link:
                  "http://www.baltic-course.com/eng/baltic_states/?doc=118924",
                source: "The Baltic Course",
                date: "April 2016"
              },
              {
                title: "Turkey pitches for increase in frequency of flights",
                link:
                  "http://www.ptinews.com/news/7268758_Turkey-pitches-for-increase-in-frequency-of-flights.html",
                source: "PTI News",
                date: "March 2016"
              },
              {
                title: "It is easy to become legal‚ Lesotho citizens told",
                link:
                  "http://www.timeslive.co.za/local/2016/03/23/It-is-easy-to-become-legal%E2%80%9A-Lesotho-citizens-told",
                source: "Times Live",
                date: "March 2016"
              },
              {
                title:
                  "VFS Global opens Hungary Visa Application Centre in Manama, Bahrain",
                link:
                  "http://www.gulfnews247.com/2016/03/16/vfs-global-opens-hungary-visa-application-centre-in-manama-bahrain/",
                source: "Gulf News",
                date: "March 2016"
              },
              {
                title: "Indian consular teams for 3 cities",
                link:
                  "http://saudigazette.com.sa/saudi-arabia/indian-consular-teams-3-cities/",
                source: "Saudi Gazette",
                date: "March 2016"
              },
              {
                title: "More Polish visa application centers in Belarus",
                link:
                  "http://eng.belta.by/society/view/more-polish-visa-application-centers-in-belarus-89617-2016/",
                source: "BelTa News – News from Belarus",
                date: "March 2016"
              },
              {
                title: "Indian consular teams for Abha, Jazan",
                link:
                  "http://saudigazette.com.sa/saudi-arabia/indian-consular-teams-abha-jazan/",
                source: "Saudi Gazette",
                date: "March 2016"
              },
              {
                title:
                  "Stanbic IBTC Offers Nigerians in Diaspora more Access to BVN Registration",
                link:
                  "http://www.nigeriacommunicationsweek.com.ng/e-financial/stanbic-ibtc-offers-nigerians-in-diaspora-more-access-to-bvn-registration",
                source: "Nigeria Communications Week",
                date: "March 2016"
              },
              {
                title: "Saudis Enjoy UK Visa on-the-go",
                link:
                  "http://www.traveltradeweekly.travel/2015-10-06-15-40-04/market-update-news/item/981-saudis-enjoy-uk-visa-on-the-go",
                source: "Travel Trade Weekly",
                date: "March 2016"
              },
              {
                title:
                  "Finland targets Chinese visitors with 13 new visa centres",
                link:
                  "http://www.traveldailymedia.com/233380/finland-targets-chinese-visitors-with-13-new-visa-centres/",
                source: "Travel Daily Asia",
                date: "March 2016"
              },
              {
                title: "Indian consular teams to visit Yanbu",
                link:
                  "http://saudigazette.com.sa/saudi-arabia/indian-consular-teams-to-visit-yanbu/",
                source: "Saudi Gazette",
                date: "March 2016"
              },
              {
                title: "Four Polish visa centers to open in Belarus by 1 March",
                link:
                  "http://eng.belta.by/society/view/four-polish-visa-centers-to-open-in-belarus-by-1-march-89240-2016/",
                source: "BelTA – News from Belarus",
                date: "February 2016"
              },
              {
                title:
                  "VFS Global opens Hungary Visa Application Centres in KSA",
                link:
                  "http://www.traveldailymedia.com/233114/vfs-global-opens-hungary-visa-application-centres-in-ksa/",
                source: "Travel Daily Media",
                date: "February 2016"
              },
              {
                title: "Maharashtra govt approves electronics policy",
                link:
                  "http://www.business-standard.com/article/pti-stories/maharashtra-govt-approves-electronics-policy-116020901164_1.html",
                source: "Business Standard",
                date: "February 2016"
              },
              {
                title:
                  "VFS Global offers On Demand Mobile Biometrics for UK visas in Qatar",
                link:
                  "http://www.bq-magazine.com/industries/other-sectors/2016/02/vfs-global-offers-on-demand-mobile-biometrics-for-uk-visas-in-qatar",
                source: "BQ Magazine",
                date: "February 2016"
              },
              {
                title: "VFS Global Rendezvous in Delhi",
                link:
                  "http://www.voyagersworld.in/article/vfs-rendezvous-delhi",
                source: "Voyager’s world",
                date: "February 2016"
              },
              {
                title: "Hungary Visa Application Centre Opens in Kuwait",
                link:
                  "http://www.asiatraveltips.com/news16/291-HungaryVisas.shtml",
                source: "Travel News India",
                date: "January 2016"
              },
              {
                title:
                  "South African Tourism targets 1 lakh Indian tourists in 2016",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/south-african-tourism-targets-1-lakh-indian-tourists-in-2016-29560",
                source: "TravelBix Monitor.com",
                date: "January 2016"
              },
              {
                title:
                  "South Africa – New Extended Visitor Visa and Postal Applications",
                link:
                  "http://www.relocatemagazine.com/news/reeditor-2016-jan-20-8466-south-africa--new-extended-visitor-visa-and-postal-applications",
                source: "Relocate Global",
                date: "January 2016"
              },
              {
                title:
                  "Britain joins the Dubai 'bling swing' with 'platinum' visa service",
                link:
                  "http://www.telegraph.co.uk/news/worldnews/middleeast/unitedarabemirates/12115111/Britain-joins-the-Dubai-bling-swing-with-platinum-visa-service.html",
                source: "The Telegraph",
                date: "January 2016"
              },
              {
                title: "Sit back, relax and get your UK visa",
                link:
                  "http://www.khaleejtimes.com/nation/general/sit-back-relax-and-get-your-uk-visa",
                source: "Khaleej Times",
                date: "January 2016"
              }
            ]
          },
          {
            year: "2015",
            content: [
              {
                title: "Czech Republic to open consulate in Oman next year",
                link:
                  "http://www.timesofoman.com/article/73974/Oman/The-Czech-Republic-will-open-an-honorary-consulate-in-Oman-in-2016",
                source: "Times of Oman",
                date: "December 2015"
              },
              {
                title:
                  "Czech Republic opens visa application centre in Muscat, Oman",
                link:
                  "http://www.muscatdaily.com/Archive/Oman/Czech-Republic-opens-visa-application-centre-in-Muscat-4hp7",
                source: "Muscat Daily",
                date: "December 2015"
              },
              {
                title:
                  "Getting your Bank Verification Number (BVN) Outside Nigeria",
                link:
                  "http://ngex.com/business/personal-finance/enrolling-for-bank-verification-number-bvn-outside-nigeria",
                source: "NgEX",
                date: "December 2015"
              },
              {
                title:
                  "Biometric requirement for Schengen visas come into force",
                link:
                  "http://www.traveldailymedia.com/230484/biometric-requirement-for-schengen-visas-comes-into-force/",
                source: "Travel Daily",
                date: "December 2015"
              },
              {
                title: "VFS Global' new centre to boost India outbound",
                link: "http://www.ttgasia.com/article.php?article_id=26383",
                source: "TTG Asia",
                date: "December 2015"
              },
              {
                title:
                  "French visa center opens as more Filipinos travel to France",
                link:
                  "http://www.mb.com.ph/french-visa-center-opens-as-more-filipinos-travel-to-france/#6IFxGHsg7bv8ab2y.99",
                source: "Manila Bulletin",
                date: "December 2015"
              },
              {
                title:
                  "VFS Global launches Visa Application Centre for the Czech Republic in Bahrain",
                link:
                  "https://www.zawya.com/story/VFS_Global_launches_Visa_Application_Centre_for_the_Czech_Republic_in_Bahrain-ZAWYA20151206095105/",
                source: "Zawya",
                date: "December 2015"
              },
              {
                title:
                  "VFS Global inaugurates its largest Visa Application Centre in Asia at Connaught Place, New Delhi",
                link:
                  "http://www.traveltradejournal.com/vfs-global-inaugurates-its-largest-visa-application-centre-in-asia-at-connaught-place-new-delhi/",
                source: "Travel Trade Journal",
                date: "December 2015"
              },
              {
                title:
                  "VFS Global will launch Visa Applications for Czech Embassy in Pretoria and Cape Town from 1 December 2015",
                link:
                  "http://www.mzv.cz/pretoria/en/visa_and_consular_information/vfs_global_will_launch_visa_applications.html",
                source: "Embassy of Czech Republic in Pretoria",
                date: "November 2015"
              },
              {
                title: "Goan to head Kuoni Group HR",
                link:
                  "http://timesofindia.indiatimes.com/City/Goa/Goan-to-head-Kuoni-Group-HR/articleshow/49975068.cms",
                source: "Times of India",
                date: "November 2015"
              },
              {
                title:
                  "South Africa: Zimbabwe Special Permit Programme Near Conclusion",
                link: "http://allafrica.com/stories/201511251177.html",
                source: "AllAfrica",
                date: "November 2015"
              },
              {
                title: "Dhiren Savla Appointed As Group CIO Of Kuoni Group",
                link:
                  "http://www.cxotoday.com/story/dhiren-savla-appointed-as-group-cio-of-kuoni-group/",
                source: "CXO Today",
                date: "November 2015"
              },
              {
                title: "VFS Global starts BVN enrolment for Nigerians in UK",
                link:
                  "http://newtelegraphonline.com/vfs-global-starts-bvn-enrolment-for-nigerians-in-uk/",
                source: "News Telegraph",
                date: "November 2015"
              },
              {
                title:
                  "VFS Global launches Visa Application Centre for the Czech Republic in Kuwait",
                link:
                  "https://www.zawya.com/story/VFS_Global_launches_Visa_Application_Centre_for_the_Czech_Republic_in_Kuwait-ZAWYA20151116081626/",
                source: "Zawya",
                date: "November 2015"
              },
              {
                title: "Lithuania opens visa center in Beijing",
                link:
                  "http://www.baltic-course.com/eng/legislation/?doc=112867",
                source: "The Baltic Course",
                date: "November 2015"
              },
              {
                title:
                  "Canada has launched new visa application centre in Poland",
                link:
                  "https://www.visareporter.com/news-article/canada-has-launched-new-visa-application-centre-in-poland/",
                source: "Visa Reporter",
                date: "November 2015"
              },
              {
                title:
                  "1.2 lakh Indians issued French Visa this year: Ambassador",
                link:
                  "http://www.businesstoday.in/current/economy-politics/1.2-lakh-indians-issued-french-visa-this-year-ambassador/story/225868.html",
                source: "Business Today",
                date: "November 2015"
              },
              {
                title: "Zubin Karkaria appointed global CEO of Kuoni",
                link:
                  "http://www.business-standard.com/article/companies/zubin-karkaria-appointed-global-ceo-of-kuoni-115110500717_1.html",
                source: "Business Standard",
                date: "November 2015"
              },
              {
                title:
                  "VFS Global launches visa application centres for Czech Republic in the UAE",
                link:
                  "http://gulfnews.com/news/uae/society/vfs-global-launches-visa-application-centres-for-czech-republic-in-the-uae-1.1613483",
                source: "Gulf News",
                date: "November 2015"
              },
              {
                title:
                  "VFS Global rolls out biometric enrolment for Schengen visas in India",
                link:
                  "http://www.financialexpress.com/article/travel/latest-updates-travel/vfs-global-rolls-out-biometric-enrolment-for-schengen-visas-in-india/160659/",
                source: "Express TravelWorld",
                date: "November 2015"
              },
              {
                title: "SA to set visa Centre at Harare",
                link:
                  "http://www.chronicle.co.zw/sa-to-set-up-visa-centre-in-harare/",
                source: "Chronicle",
                date: "November 2015"
              },
              {
                title:
                  "Chinese Embassy In Kenya Outsource Visa Application Services",
                link: "http://www.coastweek.com/3842-kenya-01.htm",
                source: "Coast Week",
                date: "October 2015"
              },
              {
                title: "UK home visa service by December in the UAE",
                link:
                  "http://gulfnews.com/news/uae/government/uk-home-visa-service-by-december-1.1604471",
                source: "Gulf News",
                date: "October 2015"
              },
              {
                title: "UK launches new visa services in UAE",
                link:
                  "http://gulfnews.com/news/uae/government/uk-launches-new-visa-services-in-uae-1.1602922",
                source: "Gulf News",
                date: "October 2015"
              },
              {
                title: "A retail hub at Shivaji Stadium in New Delhi, India",
                link:
                  "http://www.pressreader.com/india/the-times-of-india-new-delhi-edition/20151016/281749858194612/TextView",
                source: "Times of India",
                date: "October 2015"
              },
              {
                title:
                  "Czech Republic witnesses 20% growth in tourist footfall from India",
                link:
                  "http://www.financialexpress.com/article/travel/market-travel/czech-republic-witnesses-20-percent-growth-in-tourist-footfall-from-india/148737/",
                source: "Express TravelWorld",
                date: "October 2015"
              },
              {
                title: "Veridos and VFS Global Announce Strategic Partnership",
                link:
                  "http://prnw.cbe.thejakartapost.com/news/2015/veridos-and-vfs-global-announce-strategic-partnership.html",
                source: "The Jakarta Post",
                date: "October 2015"
              },
              {
                title: "Two-week lifeline for Zims in SA",
                link:
                  "http://www.thezimbabwean.co/2015/10/two-week-lifeline-for-zims-in-sa/",
                source: "The Zimbabwean",
                date: "October 2015"
              },
              {
                title:
                  "Schengen-North India Joint Visa Application Centre now in Connaught Place",
                link:
                  "http://tourismbreakingnews.com/schengen-north-india-joint-visa-application-centre-now-in-cp/",
                source: "Tourism Breaking News",
                date: "October 2015"
              },
              {
                title:
                  "Schengen visa applicants will need to submit biometric data",
                link:
                  "http://www.thehindu.com/news/cities/bangalore/schengen-visa-applicants-will-need-to-submit-biometric-data/article7682936.ece ",
                source: "The Hindu",
                date: "September 2015"
              },
              {
                title:
                  "Czech Republic opens its 1<sup>st</sup> Visa Application Centre in India in Mumbai with VFS Global",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/czech-republic-opens-its-1st-visa-application-centre-in-india-in-mumbai-with-vfs-global-28352",
                source: "TravelBiz monitor",
                date: "September 2015"
              },
              {
                title:
                  "UK records 15% hike in issuing visas to Indians during Jan-June this year",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/uk-records-15-hike-in-issuing-visas-to-indians-during-janjune-this-year-28349",
                source: "TravelBiz monitor",
                date: "September 2015"
              },
              {
                title: "Now, you can get Vietnam visa in Bengaluru",
                link:
                  "http://timesofindia.indiatimes.com/city/bengaluru/Now-you-can-get-Vietnam-visa-in-Bengaluru/articleshow/48863390.cms",
                source: "Times of India",
                date: "September 2015"
              },
              {
                title:
                  "VFS Global starts receiving single entry visa applications for Croatia from Azerbaijani citizens",
                link: "http://en.apa.az/news/231548",
                source: "Azeri-Press Agency (APA)",
                date: "September 2015"
              },
              {
                title:
                  "VFS Global Opens New South Africa Visa Application Centres in UK",
                link:
                  "http://www.prnewswire.co.uk/news-releases/vfs-global-opens-new-south-africa-visa-application-centres-in-uk-523557281.html",
                source: "PR Newswire",
                date: "September 2015"
              },
              {
                title: "VFS Global bags Express Intelligent Enterprise Award",
                link:
                  "http://www.financialexpress.com/article/travel/latest-updates-travel/vfs-global-bags-express-intelligent-enterprise-award/128224/",
                source: "Financial Express",
                date: "August 2015"
              },
              {
                title: "Vietnam visa centre could open in India",
                link:
                  "http://www.traveldailymedia.com/226042/vietnam-visa-centre-could-open-in-india/",
                source: "Travel Daily Media",
                date: "August 2015"
              },
              {
                title: "British visa process set to change",
                link:
                  "http://www.royalgazette.com/article/20150825/NEWS/150829805&source=RSS",
                source: "The Royal Gazette",
                date: "August 2015"
              },
              {
                title:
                  "How Kuoni India's Zubin Karkaria turned a small Indian operation into a global money-spinner",
                link:
                  "http://economictimes.indiatimes.com/articleshow/48554913.cms?utm_source=contentofinterest&utm_medium=text&utm_campaign=cppst",
                source: "Economic Times",
                date: "August 2015"
              },
              {
                title:
                  "All applications to the Royal Norwegian Embassy in Baku must be submitted via VFS Global's Baku Office",
                link:
                  "http://www.norway.az/studywork/visaandresidence/All-applications-to-the-Royal-Norwegian-Embassy-in-Baku-to-be-submitted-via-VFS-Globals-Baku-Office/#.VdcZtrVFqJ9 ",
                source:
                  "The Royal Norwegian Embassy in the Republic of Azerbaijan",
                date: "August 2015"
              },
              {
                title: "VFS Global wins Today’s Traveller Award 2015",
                link:
                  "http://news.chennaipatrika.com/post/2015/08/12/VFS-Global-wins-Today-Traveller-Award-2015.aspx",
                source: "Chennai Patrika",
                date: "August 2015"
              },
              {
                title: "Consular services made easy for Spanish expats",
                link:
                  "https://en-maktoob.news.yahoo.com/consular-services-made-easy-spanish-expats-053731239.html",
                source: "Yahoo News",
                date: "August 2015"
              },
              {
                title: "VFS Global launches new visa service for Spain",
                link: "http://www.tradearabia.com/news/TTN_287884.html",
                source: "Trade Arabia",
                date: "August 2015"
              },
              {
                title: "‘Leadership is trusting your staff’",
                link: "../PDF/HT_Zubin_Karkaria_250715.pdf",
                source: "Hindustan Times",
                date: "July 2015"
              },
              {
                title:
                  "Portugal joins VFS Global Schengen Visa Application Centres in United Arab Emirates",
                link:
                  "http://www.zawya.com/story/Portugal_joins_VFS_Global_Schengen_Visa_application_centers_in_UAE-ZAWYA20150720115104/",
                source: "Zawya",
                date: "July 2015"
              },
              {
                title: "British embassy outsources to VFS Global",
                link:
                  "http://www.ttrweekly.com/site/2015/06/british-embassy-outsources-to-vfs/",
                source: "TTR Weekly",
                date: "July 2015"
              },
              {
                title: "1OO Million applications & Going Strong",
                link:
                  "http://www.curiosityme.com/2015/07/13/1oo-million-applications-going-strong/",
                source: "Curiosity Middle East",
                date: "July 2015"
              },
              {
                title: "Cape Town pegged to get one-stop visa centre",
                link:
                  "http://traveller24.news24.com/TravelPlanning/VisaInfo/Cape-Town-pegged-to-get-one-stop-visa-centre-20150707",
                source: "Traveller 24",
                date: "July 2015"
              },
              {
                title:
                  "Wike Inaugurates South African Visa Application Centre in Port Harcorrt",
                link:
                  "http://www.thisdaylive.com/articles/wike-inaugurates-south-african-visa-application-centre-in-port-harcorrt/213143/",
                source: "This Day Live",
                date: "June 2015"
              },
              {
                title:
                  "VFS Global starts special service timings for UK Visa applicants in Dubai, UAE",
                link:
                  "https://www.zawya.com/story/VFS_Global_maintain_extended_working_hours_for_UK_visa_applicants_in_Dubai-ZAWYA20150625064925/",
                source: "Zawya",
                date: "June 2015"
              },
              {
                title:
                  "Netherlands joins VFS Global Schengen Visa Application Centre in the Kingdom of Saudi Arabia",
                link:
                  "https://www.zawya.com/story/Netherlands_joins_VFS_Global_Schengen_Visa_Application_Centre_in_theKingdom_of_Saudi_Arabia-ZAWYA20150623072654/",
                source: "Zawya",
                date: "June 2015"
              },
              {
                title:
                  "VFS Global to launch mobile apps for iOS & Android users",
                link:
                  "http://www.travelbizmonitor.com/Trade-News/vfs-global-to-launch-mobile-apps-for-ios--android-users-27688",
                source: "TravelBiz monitor",
                date: "June 2015"
              },
              {
                title: "Middle East solution provider for globetrotters",
                link:
                  "http://gulftoday.ae/portal/cedb5070-9af3-42d5-a85a-0780fca3762f.aspx",
                source: "Gulf Today",
                date: "June 2015"
              },
              {
                title: "VFS Global opens Canada Visa Application Centre Abuja",
                link:
                  "http://www.flynaija.com/vfs-global-opens-canada-visa-application-centre-abuja/",
                source: "Fly Naija",
                date: "June 2015"
              },
              {
                title: "KSA is our second home, says Portuguese envoy",
                link: "http://www.arabnews.com/news/762161",
                source: "Arab News",
                date: "June 2015"
              },
              {
                title: "New visa application centre to open in Rangoon",
                link:
                  "https://www.gov.uk/government/world-location-news/new-visa-application-centre-to-open-in-rangoon",
                source: "Gov.uk",
                date: "June 2015"
              },
              {
                title:
                  "Netherlands joins VFS Global Schengen Visa Application Centre in Dubai",
                link:
                  "http://www.gulfnews247.com/2015/06/10/netherlands-joins-vfs-global-schengen-visa-application-centre-in-dubai/",
                source: "Gulf News 24/7",
                date: "June 2015"
              },
              {
                title:
                  "Norway and VFS Global extend visa service delivery to Jordan",
                link:
                  "http://www.norway.jo/News_and_events/News-from-the-Embassy/Norway-and-VFS-Global-VFS-extend-visa-service-delivery-to-Amman-in-Jordan/#.VYEqX1JFqJ9",
                source: "Royal Norwegian Embassy in Amman",
                date: "June 2015"
              },
              {
                title: "VFS Global marks its 100 millionth application",
                link: "http://www.tradearabia.com/news/TTN_283099.html",
                source: "Trade Arabia",
                date: "June 2015"
              },
              {
                title:
                  "From 1 June 2015, the Royal Norwegian Embassy in Amman is handing over the reception of visa applications and permits to VFS Global",
                link:
                  "http://www.norway.jo/studywork/visaandresidence/VFS-Global-/#.VW-6HNKqpHy",
                source: "The Royal Norwegian Embassy in Jordan",
                date: "May 2015"
              },
              {
                title: "Home affairs launches premium visa centre in Sandton",
                link:
                  "http://traveller24.news24.com/TravelPlanning/VisaInfo/Home-affairs-launches-premium-visa-centre-in-Sandton-20150521",
                source: "Traveller 24",
                date: "May 2015"
              },
              {
                title:
                  "VFS Global wins award at International Business Excellence Awards 2015",
                link:
                  "https://www.zawya.com/story/VFS_Global_wins_award_at_International_Business_Excellence_Awards_2015-ZAWYA20150524053250/",
                source: "Zawya",
                date: "May 2015"
              },
              {
                title:
                  "VFS Global’s Dubai Visa Processing Centre introduces new range of visa services",
                link:
                  "http://www.financialexpress.com/article/travel/latest-updates-travel/vfs-globals-dubai-visa-processing-centre-introduces-new-range-of-visa-services/73674/",
                source: "Financial Express",
                date: "May 2015"
              },
              {
                title:
                  "India proving to be efficient for Passport and Visa Applications",
                link:
                  "http://staging.asianvoice.abplgroup.com/News/India-proving-to-be-Efficient-for-Passport-and-Visa-Applications",
                source: "Asian Voice",
                date: "May 2015"
              },
              {
                title:
                  "Macau looks to attract business and leisure tourists from India",
                link:
                  "http://www.financialexpress.com/article/travel/market-travel/macau-looks-to-attract-business-and-leisure-tourists-from-india/66231/",
                source: "Financial Express",
                date: "May 2015"
              },
              {
                title: "New Nordic visa application centre in Cebu",
                link:
                  "http://scandasia.com/new-nordic-visa-application-centre-in-cebu/",
                source: "Scandasia.com",
                date: "May 2015"
              },
              {
                title:
                  "Greece and VFS Global extend visa service delivery to Armenia",
                link:
                  "http://www.armradio.am/en/2015/05/04/greece-and-vfs-global-extend-visa-service-delivery-to-armenia/",
                source: "Public Radio of Armenia",
                date: "May 2015"
              },
              {
                title:
                  "Czech Republic and VFS Global extend visa service delivery to Georgia",
                link:
                  "http://newsday.ge/new/index.php/en/component/k2/item/908-czech-republic-and-vfs-global-extend-visa-service-delivery-to-georgia",
                source: "News Day",
                date: "May 2015"
              },
              {
                title:
                  "Portugal launched second Portugal Visa Application Centre with VFS Global in Kingdom of Saudi Arabia",
                link:
                  "https://www.zawya.com/story/Portugal_launched_second_Portugal_Visa_Application_Centre_with_VFS_Global_in_Kingdom_of_Saudi_Arabia-ZAWYA20150504072738/",
                source: "Zawya",
                date: "May 2015"
              },
              {
                title: "BMC gets Housing Plan approval Power",
                link:
                  "http://www.newindianexpress.com/states/odisha/BMC-gets-Housing-Plan-approval-Power/2015/04/30/article2790149.ece",
                source: "Indian Express",
                date: "April 2015"
              },
              {
                title: "Now, a visa to Vietnam is only three days away",
                link:
                  "http://www.thehindu.com/news/cities/chennai/now-a-visa-to-vietnam-is-only-three-days-away/article7152364.ece?ref=tpnews ",
                source: "The Hindu",
                date: "April 2015"
              },
              {
                title: "Strengthening connections",
                link:
                  "http://www.millenniumpost.in/NewsContent.aspx?NID=112547",
                source: "Millennium Post",
                date: "April 2015"
              },
              {
                title:
                  "VFS Global Vietnam Visa Application Centre opens in Hyderabad",
                link:
                  "http://www.business-standard.com/article/pti-stories/vfs-global-vietnam-visa-application-centre-opens-in-hyderabad-115042700326_1.html",
                source: "Business Standard",
                date: "April 2015"
              },
              {
                title:
                  "The Royal Norwegian Embassy has outsourced the receipt of visa and residence applications",
                link:
                  "http://www.norway.org.za/Norway_and_SouthAfrica/News/The-Royal-Norwegian-Embassy-has-outsourced-the-receipt-of-visa-and-residence-applications/#.VTzm8fBFqJ8",
                source: "Royal Norwegian Embassy in Accra",
                date: "April 2015"
              },
              {
                title:
                  "VFS Global Holds Blood Donation Camp At Wafi Mall in Dubai",
                link:
                  "http://www.eyeofarabia.com/2015/04/19/vfs-global-holds-blood-donation-camp-at-wafi-mall-in-dubai/",
                source: "Eye of Arabia",
                date: "April 2015"
              },
              {
                title:
                  "Czech Republic facilitates visa issuance for Azerbaijan",
                link: "http://www.news.az/articles/97084",
                source: "News.Az",
                date: "April 2015"
              },
              {
                title:
                  "VFS Global in Dakar to process applications from Senegal, Gambia and Guinea",
                link:
                  "http://www.ghana.norway.info/News_and_events/News-and-Events/Embassy/VFS-Global-in-Dakar-to-process-applications-from-Senagal-Gambia-and-Guinea/#.VS42MfmUcQM",
                source: "Royal Norwegian Embassy in Accra",
                date: "April 2015"
              },
              {
                title: "Queuing up for visa may be a thing of past",
                link:
                  "http://economictimes.indiatimes.com/nri/visa-and-immigration/queuing-up-for-visa-may-be-a-thing-of-past/articleshow/46857870.cms",
                source: "The Economic Times",
                date: "April 2015"
              },
              {
                title: "VFS Global Inaugurates New Premises in London",
                link:
                  "http://www.prnewswire.co.in/news-releases/vfs-global-inaugurates-new-premises-in-london-498929521.html",
                source: "PR Newswire",
                date: "April 2015"
              },
              {
                title:
                  "New Canada Visa Application Centre for Residents of UAE opens in Dubai",
                link:
                  "http://www.zawya.com/story/New_Canada_Visa_Application_Centre_for_Residents_of_UAE_opens_in_Dubai-ZAWYA20150402095557/",
                source: "Zawya",
                date: "April 2015"
              },
              {
                title:
                  "Portugal joins VFS Global Schengen Visa Application Centres in Saudi Arabia",
                link:
                  "http://www.eturbonews.com/57203/portugal-joins-vfs-global-schengen-visa-application-centres-saud",
                source: "eTN Global Travel Industry News",
                date: "April 2015"
              },
              {
                title:
                  "VFS Global launches Vietnam Visa Application Centres in Chennai & Hyderabad",
                link:
                  "http://www.travelbizmonitor.com/Top-Stories/vfs-global-launches-vietnam-visa-application-centres-in-chennai--hyderabad-26956",
                source: "Travel Biz Monitor",
                date: "March 2015"
              },
              {
                title:
                  "South Africa: Minister Gigaba Satisfied With Zim Permit Process",
                link: "http://allafrica.com/stories/201503171393.html",
                source: "AllAfrica",
                date: "March 2015"
              },
              {
                title: "UAE streamlines visa services",
                link: "http://www.etnw.co.za/NewsDetails.aspx?newsId=75722",
                source: "Travel News Weekly",
                date: "March 2015"
              },
              {
                title:
                  "Thailand outsources Visa Application Services to VFS Global in Kolkata",
                link:
                  "http://economictimes.indiatimes.com/nri/visa-and-immigration/thailand-outsources-visa-application-services-to-vfs-global-in-kolkata/articleshow/46598716.cms",
                source: "Economic Times",
                date: "March 2015"
              },
              {
                title: "South Africa gives visa application waiver",
                link:
                  "http://timesofindia.indiatimes.com/city/surat/South-Africa-gives-visa-application-waiver/articleshow/46474010.cms",
                source: "Times of India",
                date: "March 2015"
              },
              {
                title:
                  "VFS Global contracted to process applications for visas and residents permits",
                link:
                  "http://www.ghana.norway.info/News_and_events/News-and-Events/Embassy/VFS-Global-contracted-to-process-applications-for-visas-and-residents-permits/#.VQBvkY5FqJ8",
                source: "Royal Norwegian Embassy in Accra",
                date: "March 2015"
              },
              {
                title: "SA opens new visa centres in India",
                link:
                  "http://m.news24.com/traveller/TravelPlanning/VisaInfo/SA-opens-new-visa-centres-in-India-20150310 ",
                source: "News24",
                date: "March 2015"
              },
              {
                title: "New Visa Application Centers",
                link:
                  "http://www.norway.org.tr/News_and_events/News-from-Norway/New-Visa-Application-Centers/#.VPnVqo5FqJ_",
                source: "Royal Norwegian Embassy in Ankara",
                date: "March 2015"
              },
              {
                title:
                  "VFS Global inaugurate Visa Application Centre for the Republic of Cyprus",
                link:
                  "http://www.hotelandrest.com/en/tourism-news/article-12292/",
                source: "Hotelandrest.com",
                date: "March 2015"
              },
              {
                title:
                  "VFS Global extends South African Visa facility to new locations in India",
                link:
                  "http://indiablooms.com/ibns_new/finance-details/1738/vfs-global-extends-south-african-visa-facility-to-new-locations-in-india.html",
                source: "India Blooms",
                date: "March 2015"
              },
              {
                title: "Indian visa office set to open in Belfast city centre",
                link:
                  "http://www.belfasttelegraph.co.uk/news/northern-ireland/indian-visa-office-set-to-open-in-belfast-city-centre-31035328.html",
                source: "Belfast Telegraph",
                date: "March 2015"
              },
              {
                title:
                  "Indian High Commission to outsource some consular services",
                link:
                  "http://www.thehindu.com/news/international/indian-high-commission-to-outsource-some-consular-services/article6905959.ece",
                source: "The Hindu",
                date: "February 2015"
              },
              {
                title:
                  "UK embassy cuts visa processing time to 3 to 5 days - or even 24 hours",
                link:
                  "http://www.interaksyon.com/article/104870/uk-embassy-unveils-visa-service-for-3-5-day-24-hour-processing",
                source: "Interaksyon",
                date: "February 2015"
              },
              {
                title:
                  "Planning to visit Ireland and Britain? Now you can do so on a single visa",
                link:
                  "http://www.dnaindia.com/lifestyle/report-planning-to-visit-ireland-and-britain-now-you-can-do-so-on-a-single-visa-2060169",
                source: "DNA India",
                date: "February 2015"
              },
              {
                title: "VFS Global team joins “Walk for Education 2015”",
                link:
                  "http://www.curiosityme.com/2015/02/08/vfs-global-team-joins-walk-for-education-2015/",
                source: "Curiosity Middle East",
                date: "February 2015"
              },
              {
                title:
                  "Sunjay Sudhir briefs community on Visa services by VFS Global in Sydney and Adelaide",
                link:
                  "http://www.indiandownunder.com.au/2015/02/sunjay-sudhir-briefs-community-on-visa-services-by-vfs-in-sydney-and-adelaide/",
                source: "The Indian Down Under",
                date: "February 2015"
              },
              {
                title:
                  "IMC, VFS Global and Forvol Travel hosts the 5<sup>th</sup> edition of Heritage Walk",
                link:
                  "http://www.financialexpress.com/article/lifestyle/travel-tourism/imc-vfs-global-and-forvol-travel-hosts-the-5th-edition-of-heritage-walk/38093/",
                source: "Financial Express",
                date: "February 2015"
              },
              {
                title:
                  "MGTO rolls out Macau promotions during India’s main travel show",
                link:
                  "http://www.travelandtourworld.com/news/article/mgto-rolls-macau-promotions-indias-main-travel-show/",
                source: "Travel and Tour World",
                date: "January 2015"
              },
              {
                title:
                  "VFS Global inaugurates a new Italy Visa Application Centre in Kathmandu",
                link:
                  "http://www.nepaliheadlines.com/en/vfs-global-inaugurates-a-new-italy-visa-application-centre-in-kathmandu-25576",
                source: "Nepali Headlines",
                date: "January 2015"
              },
              {
                title: "MGTO appoints new representative office in India",
                link:
                  "http://www.traveldailynews.asia/news/article/57792/mgto-appoints-new-representative-office",
                source: "Travel Daily News",
                date: "January 2015"
              },
              {
                title:
                  "Two Sweden visa facilitation centres open in Abu Dhabi, Dubai",
                link:
                  "http://gulftoday.ae/portal/57e0fd8e-4ac4-4537-b57a-5955ac330186.aspx",
                source: "The Gulf Today",
                date: "January 2015"
              }
            ]
          },
          {
            year: "2014",
            content: [
              {
                title:
                  "Indian mission to soon open 3 new passport centres in Jeddah",
                link:
                  "http://economictimes.indiatimes.com/nri/visa-and-immigration/indian-mission-to-soon-open-3-new-passport-centres-in-jeddah/articleshow/45607270.cms ",
                source: "The Economic Times",
                date: "December 2014"
              },
              {
                title: "Canadian embassy outsources visa applications",
                link:
                  "http://www.gulf-times.com/qatar/178/details/414728/canadian-embassy-outsources-visa-applications",
                source: "Gulf Times",
                date: "November 2014"
              },
              {
                title: "VFS Global Group: The one-stop visa shop",
                link:
                  "http://www.khaleejtimes.com/biz/inside.asp?section=uaebusiness&xfile=/data/uaebusiness/2014/October/uaebusiness_October220.xml",
                source: "Khaleej Times",
                date: "October 2014"
              },
              {
                title:
                  "Norway makes it even easier for Barents Russians to apply for visa",
                link:
                  "http://barentsobserver.com/en/borders/2014/10/norway-makes-it-even-easier-barents-russians-apply-visa-03-10",
                source: "Barents Observer",
                date: "October 2014"
              },
              {
                title:
                  "VFS Global wins HP Innovation Award for major IT Transformation",
                link:
                  "http://www.indiainfoline.com/Markets/News/VFS-Global-wins-HP-Innovation-Award-for-major-IT-Transformation/5956684272",
                source: "India Infoline News",
                date: "July 2014"
              },
              {
                title:
                  "VFS Global Receives Recognition from Al-Nasr Sports Club for Commendable Service",
                link:
                  "http://www.eglobaltravelmedia.com.au/vfs-global-receives-recognition-from-al-nasr-sports-club-for-commendable-service/",
                source: "eGlobal Travel Media",
                date: "June 2014"
              },
              {
                title:
                  "Swedish Embassy outsources visa services in Vietnam through VFS Global",
                link:
                  "http://thanhniennews.com/travel/swedish-embassy-outsources-visa-services-in-vietnam-through-vfs-global-27336.html",
                source: "Thanh Nien News",
                date: "June 2014"
              },
              {
                title:
                  "Aus, VFS Global extend visa service delivery in India, Nepal",
                link:
                  "http://www.business-standard.com/article/pti-stories/aus-vfs-global-extend-visa-service-delivery-in-india-nepal-114061200938_1.html",
                source: "Business Standard",
                date: "June 2014"
              },
              {
                title: "South Africa: Visa Made Easier",
                link: "http://allafrica.com/stories/201406060357.html",
                source: "All Africa",
                date: "June 2014"
              },
              {
                title:
                  "VFS Global opens Switzerland Visa Application Centre in Manama, Bahrain",
                link:
                  "https://www.zawya.com/story/VFS_Global_opens_Switzerland_Visa_Application_Centre_in_Manama_Bahrain-ZAWYA20140601091132/",
                source: "Zawya",
                date: "June 2014"
              },
              {
                title:
                  "VFS Global opens Switzerland Visa Application Centre in Kuwait City",
                link:
                  "https://www.zawya.com/story/VFS_Global_opens_Switzerland_Visa_Application_Centre_in_Kuwait_City-ZAWYA20140604084331/",
                source: "Zawya",
                date: "June 2014"
              },
              {
                title: "New Schengen visa center opens",
                link: "http://www.arabnews.com/news/579676",
                source: "Arab News",
                date: "May 2014"
              },
              {
                title:
                  "VFS Global inaugurates Joint Application Centre for Italy & France Visa in Kolkata",
                link:
                  "http://www.travelbizmonitor.com/vfs-global-inaugurates-joint-application-centre-for-italy--france-visa-in-kolkata-24064",
                source: "Travelbizmonitor",
                date: "May 2014"
              },
              {
                title:
                  "UK unveils new Visa Application Centre in Jakarta to support growth",
                link:
                  "https://www.gov.uk/government/world-location-news/uk-unveils-new-visa-application-centre-in-jakarta-to-support-growth",
                source: "GOV.UK",
                date: "May 2014"
              },
              {
                title: "UK opens new visa application centre in Bangkok",
                link:
                  "http://phuketnews.phuketindex.com/government/uk-opens-new-visa-application-centre-in-bangkok-201827.html",
                source: "Phuketindex.com",
                date: "May 2014"
              },
              {
                title:
                  "UK Offers an Improved Visa Application Service in Vietnam",
                link:
                  "https://www.gov.uk/government/world-location-news/uk-offers-an-improved-visa-application-service-in-vietnam",
                source: "GOV.UK",
                date: "May 2014"
              },
              {
                title:
                  "The British Embassy announced to substantially increase the frequency of its visa application services in Lao PDR",
                link:
                  "https://www.gov.uk/government/world-location-news/uk-increases-visa-services-in-lao-pdr",
                source: "GOV.UK",
                date: "May 2014"
              },
              {
                title: "New UK visa center for Beijing",
                link: "http://www.ecns.cn/2014/04-24/110917.shtml",
                source: "China News Service",
                date: "April 2014"
              },
              {
                title:
                  "Norwegian Visa Application Centres in Beijing, Guangzhou and Shanghai",
                link:
                  "http://www.norway.cn/studywork/visaandresidence/Visa-and-other-permits/Visa-Information/Norwegian-Visa-Application-Centre-in-Beijing-opening-on-31-August-2012/",
                source: "Norway in China (official website)",
                date: "April 2014"
              },
              {
                title: "Hungarian visa centre to open in Kiev",
                link:
                  "http://www.politics.hu/20140422/hungarian-visa-centre-to-open-in-kiev/",
                source: "Kiev",
                date: "April 2014"
              },
              {
                title: "UK opens two visa application centres",
                link:
                  "http://indianexpress.com/article/cities/mumbai/uk-opens-two-visa-application-centres/",
                source: "The Indian Express",
                date: "March 2014"
              },
              {
                title:
                  "Germany & VFS Global open 10 Visa Application Centres in India, 1 in Bhutan",
                link:
                  "http://www.travelbizmonitor.com/germany--vfs-global-open-10-visa-application-centres-in-india-1-in-bhutan-22908",
                source: "Travel Biz Monitor",
                date: "January 2014"
              }
            ]
          },
          {
            year: "2013",
            content: [
              {
                title:
                  "Zubin Karkaria conferred Travel Entrepreneur of the Decade Award at ETAA Convention in Dubai",
                link:
                  "http://www.travelbizmonitor.com/zubin-karkaria-conferred-travel-entrepreneur-of-the-decade-award-at-etaa-convention-in-dubai-22599",
                source: "Travel Biz Monitor",
                date: "December 2013"
              },
              {
                title:
                  "New visa center promises streamlined service to Pinoys bound for UK, 3 other countries",
                link:
                  "http://www.gmanetwork.com/news/story/339028/pinoyabroad/news/new-visa-center-promises-streamlined-service-to-pinoys-bound-for-uk-3-other-countries",
                source: "GMA NEWS",
                date: "December 2013"
              },
              {
                title: "France opens new visa center in Al-Khobar",
                link:
                  "http://www.saudigazette.com.sa/index.cfm?method=home.regcon&contentid=20131125187665",
                source: "Saudi Gazette",
                date: "November 2013"
              },
              {
                title:
                  "Asia's Travel Business: VFS Global, The One-Stop Visa Shop",
                link:
                  "http://www.forbes.com/sites/naazneenkarmali/2013/10/15/harriers-to-entry/",
                source: "Forbes",
                date: "October 2013"
              },
              {
                title:
                  "Immigration New Zealand and VFS Global launch new visa services in UAE",
                link:
                  "http://www.traveldailynews.asia/news/article/53548/immigration-new-zealand-and-vfs",
                source: "Travel Daily News",
                date: "September 2013"
              },
              {
                title:
                  "Belgium and VFS Global open visa application centre in Pune",
                link:
                  "http://travel.financialexpress.com/latest-updates/1793-belgium-and-vfs-global-opens-visa-application-centre-in-pune",
                source: "Express Travel World",
                date: "September 2013"
              },
              {
                title: "Denmark opens visa application centre in HCM City",
                link:
                  "http://en.vietnamplus.vn/Home/Denmark-opens-visa-application-centre-in-HCM-City/20139/38462.vnplus",
                source: "VietnamPlus",
                date: "September 2013"
              },
              {
                title:
                  "Embassy of Denmark to handle visa application to Finland, Iceland, Norway and Sweden",
                link:
                  "http://scandasia.com/embassy-of-denmark-to-handle-visa-application-to-finland-iceland-norway-and-sweden/",
                source: "ScandAsia",
                date: "August 2013"
              },
              {
                title:
                  "VFS Global wins Denmark and the Netherlands global contracts",
                link:
                  "http://www.travelbizmonitor.com/vfs-global-wins-denmark-and-the-netherlands-global-contracts-21243",
                source: "Travel Biz Monitor",
                date: "August 2013"
              },
              {
                title: "VFS Global wins Dubai Quality Appreciation Award",
                link:
                  "http://www.travelbizmonitor.com/vfs-global-wins-dubai-quality-appreciation-award-20369 ",
                source: "Travel Biz Monitor",
                date: "May 2013"
              },
              {
                title:
                  "Belgium, VFS Global extend visa service delivery to six locations across India",
                link:
                  "http://www.travelbizmonitor.com/belgium-vfs-global-extend-visa-service-delivery-to-six-locations-across-india-20061",
                source: "Travel Biz Monitor",
                date: "April 2013"
              },
              {
                title: "Where Government Processes Drive Business",
                link: "../PDF/WhereGovernmentProcessesDriveBusiness.pdf",
                source: "The Economic Times",
                date: "April 2013"
              },
              {
                title:
                  "Zubin Karkaria becomes first Asian to be appointed on the Executive Board of Kuoni Group",
                link: "../PDF/ZubinKarkariaAppointedonEBofKuoniGroup.pdf",
                source: "Travel Biz Monitor",
                date: "April 2013"
              },
              {
                title:
                  "VFS Global successfully holds Mobile Biometric Clinic in Goa",
                link:
                  "http://www.travelbizmonitor.com/vfs-global-successfully-holds-mobile-biometric-clinic-in-goa-20206",
                source: "Travel Biz Monitor",
                date: "April 2013"
              },
              {
                title:
                  "Zubin Karkaria appointed on Executive Board of Kuoni Group",
                link:
                  "http://www.indiainfoline.com/Markets/News/Zubin-Karkaria-appointed-on-Executive-Board-of-Kuoni-Group/5646389749",
                source: "Indiainfoline.com",
                date: "March 2013"
              },
              {
                title: "Saudi Arabia outsources visa processing in UAE",
                link:
                  "http://www.emirates247.com/news/emirates/saudi-arabia-outsources-visa-processing-in-uae-2013-03-29-1.500504",
                source: "Emirates 24/7",
                date: "March 2013"
              },
              {
                title:
                  "First of its kind Visa Application Centre for Five Countries Conference (5CC) launched in Singapore",
                link:
                  "http://www.etravelblackboardasia.com/article/90178/first-of-its-kind-visa-application-centre-for-five-countries-conference-5cc-launched-in-singapore",
                source: "e Travel Blackboard",
                date: "March 2013"
              },
              {
                title:
                  "VFS Global not responsible for verification of documents’ authenticity – Vijayakumar",
                link:
                  "http://www.vanguardngr.com/2013/02/vfs-not-responsible-for-verification-of-documents-authenticity-vijayakumar/",
                source: "Vanguard",
                date: "February 2013"
              },
              {
                title:
                  "VFS Global speeds up process for acquisition of entry visas",
                link:
                  "http://www.arabnews.com/vfs-speeds-process-acquisition-entry-visas",
                source: "Arab News",
                date: "February 2013"
              },
              {
                title: "Southerners facilitated to go to UK",
                link:
                  "http://www.tuoitrenews.vn/cmlink/tuoitrenews/society/southerners-facilitated-to-go-to-uk-1.98736",
                source: "Tuoitre News",
                date: "February 2013"
              },
              {
                title: "Heritage walk for expats",
                link:
                  "http://articles.timesofindia.indiatimes.com/2013-02-03/mumbai/36720681_1_heritage-historic-buildings-capitol-cinema",
                source: "The Times of India",
                date: "February 2013"
              },
              {
                title:
                  "New Visa-centre for Sweden, Denmark and Norway inaugurated",
                link:
                  "http://scandasia.com/new-visa-centre-for-sweden-denmark-and-norway-inaugurated/",
                source: "ScandAsia.com",
                date: "January 2013"
              },
              {
                title:
                  "Another accolade for VFS Global as it continues to expand its global footprint",
                link: "../PDF/TravelBizMonitor_TAAI_Award.pdf",
                source: "Travel Biz Monitor",
                date: "January 2013"
              }
            ]
          },
          {
            year: "2012",
            content: [
              {
                title: "HCM City to house European visa application centre",
                link:
                  "http://english.vietnamnet.vn/fms/society/54311/hcm-city-to-house-european-visa-application-centre.html",
                source: "Vietnamnet Bridge",
                date: "December 2012"
              },
              {
                title: "China opens Visa Application Service Center in Kolkata",
                link:
                  "http://www.travelbizmonitor.com/china-opens-visa-application-service-center-in-kolkata-18354",
                source: "Travelbizmonitor.com",
                date: "November 2012"
              },
              {
                title:
                  "Slovenia appoints VFS Global to manage visa application services in 6 Indian cities",
                link:
                  "http://www.travelbizmonitor.com/slovenia-appoints-vfs-global-to-manage-visa-application-services-in-6-indian-cities-18080",
                source: "Travelbizmonitor.com",
                date: "October 2012"
              },
              {
                title:
                  "British ambassador visits Cebu, opens new visa application center",
                link:
                  "http://www.sunstar.com.ph/cebu/business/2012/10/11/british-ambassador-visits-cebu-opens-new-visa-application-center-247524",
                source: "Sun.Star",
                date: "October 2012"
              },
              {
                title: "Finnish visa centre opened in Murmansk",
                link: "http://barentsnova.com/node/2085",
                source: "Barentsnova",
                date: "October 2012"
              },
              {
                title: "Dhiren Savla, VFS Global wins CIO 100 Award",
                link:
                  "http://www.cio.in/cio100-2012/winner/dhiren-savla-vfs-global-services",
                source: "CIO.IN",
                date: "September 2012"
              },
              {
                title: "VFS Global wins Saudi Arabia government visa service",
                link:
                  "http://www.traveldailymedia.com/135861/vfs-global-wins-saudi-arabia-government-visa-service",
                source: "Travel Daily Media",
                date: "August 2012"
              },
              {
                title: "UK Immigration to open biometric clinic in Kazakhstan",
                link:
                  "http://www.workpermit.com/news/2012-08-16/uk-immigration-to-open-biometric-clinic-in-kazakhstan",
                source: "Workpermit.com",
                date: "August 2012"
              },
              {
                title: "New UK visa application centre inaugurated",
                link:
                  "http://www.thehimalayantimes.com/fullNews.php?headline=New+UK+visa+application+centre+inaugurated&NewsID=340301",
                source: "The Himalayan Times",
                date: "July 2012"
              },
              {
                title:
                  "DVPC introduces new online service for Indian travel agents",
                link:
                  "http://www.expresstravelworld.com/latest-updates/491-dvpc-introduces-new-online-service-for-indian-travel-agents",
                source: "Express Travel World",
                date: "July 2012"
              },
              {
                title: "UK offers premium visa services",
                link:
                  "http://www.nst.com.my/nation/general/uk-offers-premium-visa-services-1.109609",
                source: "The New Straits Times",
                date: "July 2012"
              },
              {
                title:
                  "Spain visa application center opens in Riyadh and Jeddah",
                link:
                  "http://www.arabnews.com/spain-visa-application-center-opens-riyadh-and-jeddah",
                source: "arab news.com",
                date: "May 2012"
              },
              {
                title: "Get UK visa at new centre",
                link:
                  "http://timesofindia.indiatimes.com/city/bangalore/Get-UK-visa-at-new-centre/articleshow/13368437.cms",
                source: "The Times of India",
                date: "May 2012"
              },
              {
                title: "Netherlands sets up visa centre in Chennai",
                link:
                  "http://articles.economictimes.indiatimes.com/2012-04-30/news/31508363_1_application-centre-visa-application-vfs-global",
                source: "The Economic Times",
                date: "April 2012"
              },
              {
                title:
                  "VFS Global opens Thailand visa application centre in Bangalore",
                link:
                  "http://ibnlive.in.com/generalnewsfeed/news/vfs-global-opens-thailand-visa-application-centre-in-bangalore/988309.html",
                source: "IBNLive.com",
                date: "April 2012"
              },
              {
                title:
                  "VFS Global Bangalore centre to accept visa forms for France, Switzerland",
                link:
                  "http://www.thehindubusinessline.com/industry-and-economy/article3328545.ece",
                source: "Hindu Business Line",
                date: "April 2012"
              },
              {
                title: "Japan Visa application Centre opens in New Delhi",
                link:
                  "http://www.indiainfoline.com/Markets/News/Japan-Visa-application-Centre-opens-in-New-Delhi/5397074683",
                source: "Indiainfoline.com",
                date: "April 2012"
              },
              {
                title: "Passport services for Indian nationals outsourced",
                link:
                  "http://articles.economictimes.indiatimes.com/2012-04-05/news/31294044_1_outsourced-new-passports-indian-embassy",
                source: "The Economic Times",
                date: "April 2012"
              },
              {
                title:
                  "Two new India visa application centres open in Singapore",
                link:
                  "http://news.asiaone.com/News/Latest%2BNews/Relax/Story/A1Story20120405-338019.html",
                source: "asiaone.com",
                date: "April 2012"
              },
              {
                title: "New visa center in EP boosts Austrian ties",
                link: "http://www.arabnews.com/node/408840",
                source: "arab news.com",
                date: "March 2012"
              },
              {
                title: "Swiss visa centres in ten more cities",
                link:
                  "http://news.in.msn.com/national/article.aspx?cp-documentid=5890950",
                source: "msn.com",
                date: "March 2012"
              },
              {
                title:
                  "Switzerland partners with VFS Global to open 10 regional visa application centres across India",
                link:
                  "http://www.travelbizmonitor.com/switzerland-partners-with-vfs-global-to-open-10-regional-visa-application-centres-across-india-15838",
                source: "Travelbizmonitor.com",
                date: "March 2012"
              },
              {
                title: "Swiss visa application centres in ten more cities",
                link:
                  "http://economictimes.indiatimes.com/news/nri/visa-and-immigration/swiss-visa-centres-in-ten-more-cities/articleshow/12100962.cms",
                source: "The Economic Times",
                date: "March 2012"
              },
              {
                title: "VFS Global honoured",
                link:
                  "http://www.vfsglobal.com/pdf/VFS-Global-The-Economic-Times-12-March-2012.pdf",
                source: "The Economic Times",
                date: "March 2012"
              },
              {
                title: "VFS Global receives 'Capgemini Leadership Award",
                link:
                  "http://www.indiainfoline.com/Markets/News/VFS-Global-receives-Capgemini-Leadership-Award/5358135244",
                source: "Indiainfoline.com",
                date: "February 2012"
              },
              {
                title:
                  "VFS Global Awarded the ‘Capgemini Leadership Award for Innovation 2012’ at the NASSCOM Global Leadership Awards",
                link:
                  "http://www.telegraphindia.com/external/display.jsp?mode=details&id=30130",
                source: "The Telegraph",
                date: "February 2012"
              },
              {
                title:
                  "VFS Global collaborates with Embassy of Hungary for visa",
                link:
                  "http://articles.economictimes.indiatimes.com/2012-01-24/news/30659235_1_visa-application-application-centre-vfs-global",
                source: "The Economic Times",
                date: "January 2012"
              }
            ]
          },
          {
            year: "2011",
            content: [
              {
                title:
                  "Visa outsourcing centre in Qatar now works for all countries in the Gulf region",
                link: "http://www.mfa.bg/en/news/view/32118",
                source: "The Republic of Bulgaria Ministry of Foreign Affairs",
                date: "December 2011"
              },
              {
                title: "Denmark opens visa centre",
                link:
                  "http://www.thehimalayantimes.com/fullNews.php?headline=Denmark+opens+visa+centre+&NewsID=307777",
                source: "Thehimalayantimes.com",
                date: "November 2011"
              },
              {
                title: "Fast-track your UK’s visitor’s visa",
                link:
                  "http://www.prnewswire.com/news-releases/visa-with-delivery-to-siberia-visa-processing-center-to-open-in-krasnoyarsk-russia-134232508.html",
                source: "Daily News",
                date: "November 2011"
              },
              {
                title:
                  "Visa With Delivery to Siberia: Visa Processing Center to Open in Krasnoyarsk, Russia",
                link:
                  "http://www.google.com/url?sa=X&q=http://ibnlive.in.com/generalnewsfeed/news/thailand-opens-visa-application-centre-in-hyderabad/711182.html&ct=ga&cad=CAcQARgBIAAoATAAOABApree7wRIAVgBYgVlbi1JTg&cd=93ogz_8FTUA&usg=AFQjCNGTSXqPIQiJkezpJ7ZHeCAPH-TuaA",
                source: "PRNewswire.com",
                date: "November 2011"
              },
              {
                title: "Thailand opens visa application centre in Hyderabad",
                link:
                  "http://www.google.com/url?sa=X&q=http://ibnlive.in.com/generalnewsfeed/news/thailand-opens-visa-application-centre-in-hyderabad/711182.html&ct=ga&cad=CAcQARgBIAAoATAAOABApree7wRIAVgBYgVlbi1JTg&cd=93ogz_8FTUA&usg=AFQjCNGTSXqPIQiJkezpJ7ZHeCAPH-TuaA",
                source: "IBNLive.com",
                date: "June 2011"
              },
              {
                title:
                  "Thailand outsources visa applications to VFS Global in Hyderabad",
                link:
                  "http://www.dnaindia.com/india/report_thailand-outsources-visa-applications-to-vfs-global-in-hyderabad_1550403",
                source: "DNAIndia.com",
                date: "June 2011"
              },
              {
                title: "Australia extends biometrics collection for visas",
                link: "http://www.planetbiometrics.com/article-details/i/574/",
                source: "Planet Biometrics",
                date: "March 2011"
              },
              {
                title:
                  "Inauguration of the new visa application center in Nairobi",
                link:
                  "http://www.swedenabroad.com/en-GB/Embassies/Nairobi/Current-affairs/News/Inauguration-of-the-new-visa-application-center-in-Nairobi/",
                source: "Embassy of Sweden",
                date: "March 2011"
              },
              {
                title:
                  "Malaysian Deputy PM visits Malaysia Visa Application Centre",
                link:
                  "http://www.indiainfoline.com/Markets/News/Malaysian-Deputy-PM-visits-Malaysia-Visa-Application-Centre/5101447582",
                source: "Indiainfoline.com",
                date: "March 2011"
              },
              {
                title:
                  "VFS Global to open seven Malaysia Visa Application Centres in the first half of 2011",
                link:
                  "http://www.travelbizmonitor.com/vfs-global-to-open-seven-malaysia-visa-application-centres-in-the-first-half-of-2011-12879",
                source: "Travelbizmonitor.com",
                date: "March 2011"
              },
              {
                title:
                  "Finnish visa application centre in St. Petersburg is the largest of its kind in the world",
                link:
                  "http://www.hs.fi/english/article/Finnish+visa+application+centre+in+St+Petersburg+is+the+largest+of+its+kind+in+the+world/1135263673925",
                source: "Helsingin Sanomat International Edition – Foreign"
              }
            ]
          },
          {
            year: "2010",
            content: [
              {
                title:
                  "South African High Commission in Nigeria has formally announced agreement with a Lagos based firm, the VFS Global Services for outsourcing of visa application processes",
                link: "http://www.africanews.com/site/list_message/32103",
                source: "AFRICAnews.com",
                date: "December 2010"
              },
              {
                title:
                  "Increase in Middle East Arrivals to Cyprus Spurs Opening of New Visa Processing Centre in Dubai",
                link:
                  "http://www1.albawaba.com/news/increase-middle-east-arrivals-cyprus-spurs-opening-new-visa-processing-centre-dubai-0",
                source: "Al Bawaba News",
                date: "November 2010"
              },
              {
                title: "Fast service at the Visa Application Centre in Kyiv",
                link:
                  "http://formin.finland.fi/public/default.aspx?contentid=204859&nodeid=15148&contentlan=2&culture=en-US",
                source: "Ministry of Foreign Affairs of Finland",
                date: "November 2010"
              },
              {
                title:
                  "ISACA Mumbai Chapter confers IT Governance and IT Security awards to VFS Global",
                link:
                  "http://www.indiainfoline.com/Markets/News/ISACA-Mumbai-Chapter-confers-IT-Governance-and-IT-Security-awards/4924995229",
                source: "Indiainfoline.com",
                date: "September 2010"
              },
              {
                title: "New Norwegian Visa Application Centre in Bangkok",
                link:
                  "http://www.scandasia.com/viewNews.php?coun_code=no&news_id=6814",
                source: "Scandasia.com",
                date: "July 2010"
              },
              {
                title: "French Visa Processing Outsourced",
                link:
                  "http://www.hindu.com/2010/07/10/stories/2010071051540300.htm",
                source: "The Hindu",
                date: "July 2010"
              },
              {
                title:
                  "Malaysian High Commission Ties Up With VFS Global To Service Visa Applications",
                link:
                  "http://www.travelbizmonitor.com/PrintArticle.aspx?aid=10492&sid=0",
                source: "TravelBizMonitor.com",
                date: "June 2010"
              },
              {
                title:
                  "Emirates Airlines partners with VFS Global to introduce online Visa service",
                link:
                  "http://www.travelbizmonitor.com/Infopg.aspx?aspxerrorpath=/articleDetails.aspx",
                source: "TravelBizMonitor.com",
                date: "May 2010"
              },
              {
                title:
                  "High Commission of India, Canberra outsources Police Clearance and Driving License Verifications to VFS Global",
                link:
                  "http://www.hcindia-au.org/pdf/Outsourcing%20-31%2003%202010.pdf",
                source: "High Commission of India, Australia",
                date: "April 2010"
              }
            ]
          },
          {
            year: "2009",
            content: [
              {
                title:
                  "VFS Global launches new refurbished UK VAC in Abu Dhabi",
                link:
                  "http://archive.gulfnews.com/articles/09/04/10/10302719.html",
                source: "Gulfnews.com",
                date: "April 2009"
              },
              {
                title: "Getting a visa to Schengen nations will be easier now",
                link:
                  "http://timesofindia.indiatimes.com/Mumbai/Getting_a_visa_to_Schengen_nations_will_be_easier_now/articleshow/4157579.cms?",
                source: "Times of India, Mumbai",
                date: "20 Feb 2009"
              }
            ]
          },
          {
            year: "2008",
            content: [
              {
                title: "Indian High Commission to outsource visa applications",
                link:
                  "http://economictimes.indiatimes.com/Indian_High_Commission_to_outsource_visa_applications/articleshow/3040468.cms",
                source: "Economic Times, London",
                date: "May 2008"
              },
              {
                title: "European visa process to get easier",
                link:
                  "http://gulfnews.com/business/tourism/european-visa-process-to-get-easier-1.104098",
                source: "Gulf News, Dubai",
                date: "May 2008"
              },
              {
                title: "Towards new global economic architecture",
                link:
                  "http://www.hindu.com/2008/02/19/stories/2008021953180900.htm",
                source: "The Hindu, Mumbai",
                date: "January 2008"
              },
              {
                title: "China-India relations are on an upswing",
                link:
                  "http://economictimes.indiatimes.com/Brand_Equity_/China-India_relations_are_on_an_upswing/articleshow/2722993.cms",
                source: "The Economic Times",
                date: "January 2008"
              },
              {
                title: "New Indian Visa Centre in Beijing",
                link:
                  "http://www.hindu.com/2008/01/08/stories/2008010856221300.htm",
                source: "The Hindu, Beijing",
                date: "January 2008"
              }
            ]
          }
        ]
      },
      events: {
        //number of events news to show at start in page (currently showing 10 news as given here)
        show_at_start: 10,
        //number of events to load on click of "Load More" button (currently loading next 10 events on each click of button)
        load_next: 10,
        //each event must have an image; below is given base path of folder which contains images of all events.
        images_path: "../assets/images/news/events/",
        content_details: [
          {
            title: "Schengen Wall inaugurated at the Visa Application Centre in Pune",
            image_desc: {
              image_name: "Application-Centre-in-Pune.jpg",
              desc: "H.E. Mr. Jean-Claude Kugener, Ambassador of Luxembourg to India and Nepal (second from left), and Mr. David Goebbels, Deputy Head of Mission of Luxembourg to India and Nepal (second from right) inaugurated the Schengen Wall in the Visa Application Centre in Pune, on 22 August 2019."
            },
            //give show_on_latest: true if you want to show current event in "Latest News" section
            show_on_latest: true,
            //give show_on_home: true if you want to show current event in Government Home Page
            show_on_home: true,
            //give show_image_on_home: true if you want to show image of current event in Government Home Page
            show_image_on_home: false
          },
          {
            title: "Inauguration of Joint Visa Application Centre in Accra",
            image_desc: {
              image_name: "Accra-jvac-Inauguration.jpg",
              desc: "H.E. Mr. Giovanni Favilli, Ambassador Italy, Ms. Oliva Alessandra,   Deputy Head of Mission Italy, Mr. Ivo Kersten, Liaison Officer CSO (LOC) the Netherlands, Mr. Roland Moser, Vice Consul Swiss, Ms. Louise Desjeunes, Visa Office Swiss, H.E. Mr. Gunnar Andreas Holm, Ambassador Norway, Ms. Trine Lystad Olsen, Visa Officer Norway, Mr Thapelo Madumane, Deputy High Commissioner South Africa, Mr. T H Makhubuh, Consul South Africa and Cathrine Wesley, Country Manager Emirates inaugurated the Joint Visa Application Centre in Accra."
            }
          },
          {
            title: "Inauguration of the National Identification Number enrolment centre in Accra for Nigerians residing in Ghana",
            image_desc: {
              image_name: "nimc-centre-in-Ghana.jpg",
              desc: "Mr. Alvan Ikoku, AGM/Head Strategy & Program Office (second from right) and Vivek Anandh, Country Manager, VFS Global, Ghana (first from left) inaugurated the National Identification Number enrolment centre in Accra on 16 August 2019."
            }
          },
          
          {
            title: "Inauguration of the National Identification Number enrolment centre in Delhi for Nigerians residing in India",
            image_desc: {
              image_name: "nimc-Delhi-launch.jpg",
              desc: "National Identification Number enrolment centre for the Nigerian nationals inaugurated in Delhi by Mr. Okere, Samuel Onwuzurike, Counsellor/Head – Trade & Investment, High Commission of the Federal Republic of Nigeria and Mr. Alok Singhal, Regional Head- North & East India, VFS Global."
            }
          },

            {
            title: "Inauguration of the National Identification Number enrolment centre for Nigerians residing in the Kingdom of Saudi Arabia",
            image_desc: {
              image_name: "enrolment-centre-ksa.jpg",
              desc: "First-ever Nigerian National Identification Number Enrolment Centre inaugurated in Jeddah by Aliyyu A. Gumi, Assistant General Manager, National Identity Management Commission, Nigeria (second from left), Garba Satomi Grema, Deputy Consul General, Consulate General of Nigeria (third from right)."
            }
          },
          {
            title: "VFS Global signs a Memorandum of Understanding with Ministry of Foreign Affairs of Georgia in Mumbai",
            image_desc: {
              image_name: "georgia-in-mumbai.jpg",
              desc: "H.E. Mr. Archil Dzuliashvili, Ambassador of Georgia (left) and Mr. Alok Singhal, Regional Head- North & East India, VFS Global (right), at the signing of the MoU on 19 July 2019"
            }
          },

          {
            title: "Inauguration of the Premium Lounge in Chennai, India",
            image_desc: {
              image_name: "Premium-Lounge-in-Chennai-inauguration.jpg",
              desc: "Mr Jeremy Pilmore Bedford, British Deputy High Commissioner, Chennai (extreme left); Ms Catherine Suard, Consule Générale à Pondichéry et Chennai (second from left); Mr Pranav Sinha, Regional Head – West & South India, Maldives and Sri Lanka, VFS Global (third from right); Ms Kornelia Wegener, Head of Visa Section, Consulate General of the Federal Republic of Germany (second from right); and Mr Mark Van De  Vreken, Consul General, Consulate General of the Kingdom of Belgium, Chennai (extreme right), at the formal inauguration of the Premium Lounge in Chennai, India"
            }
          },
          {
            title: "Visit at the Nigeria Visa Application Centre in Mumbai",
            image_desc: {
              image_name: "Visit-at-the-Nigeria.jpg",
              desc: "Ms. Folakemi Adelore, Director Legal Services Minister of Interior – Nigeria (second from left) with Mr. Pranav Sinha, Regional Head – West & South India, Maldives and Sri Lanka (second from right), during a visit at the Nigeria Visa Application Centre in Mumbai, India, on 11 June 2019."
            }
          },
          {
            title: "Inauguration of the Italia Tourist Information Centre in Bahrain",
            image_desc: {
              image_name: "Italy-Information-Centre-Bahrain.jpg",
              desc: "H.E. Domenico Bellato, Ambassador of Italy to the Kingdom of Bahrain (right), inaugurating the Italia Tourist Information Centre, on 16 June 2019 in Manama, Bahrain."
            }
          },
          {
            title: "Inauguration of Netherlands Passport and ID Services Centre in Canada",
            image_desc: {
              image_name: "Inauguration-of-Netherlands.jpg",
              desc: "Mr. Bernard Vijaykumar, Regional Head – Americas, VFS Global (third from left),  Mr. Henk Snoeken - Consul General of the Kingdom of Netherlands in Vancouver (fourth from left) and Mr. Jerry Bouma - Honorary Consul of the Kingdom of Netherlands in Edmonton (extreme right) inaugurating the new Netherlands Passport and ID Services Centre in Edmonton, Alberta in Canada on 07 June 2019."
            }
          },
          {
            title: "VFS Global CEO Zubin Karkaria honoured with Global Game Changers Award at The Indian Awards in London",
            image_desc: {
              image_name: "zubin-london-award.jpg",
              desc: "Zubin Karkaria, CEO, VFS Global Group, receives the Global Game Changers Award from Rt. Hon. Patricia Scotland QC, Secretary General of the Commonwealth, at the Indian Awards 2019 at the Houses of Parliament, on Wednesday night."
            }
          },
          {
            title: "Slovakia Visa Application Centre inaugurated in Bengaluru",
            image_desc: {
              image_name: "Centre-inaugurated-in-Bengaluru.jpg",
              desc: "H.E. Mr Ivan Lančarič, Ambassador Extraordinary and Plenipotentiary of the Slovak Republic (right), inaugurates the Slovakia Visa Application Centre in Bengaluru, India, on 29 May 2019, along with Dr. Roy C. J., Honorary Consul of the Slovak Republic in Bengaluru (centre) and Mr. Pranav Sinha, Regional Head (West and South India), VFS Global"
            }
          },
          {
            title: "Italian Embassy launches Casa Italia at VFS Global in New Delhi",
            image_desc: {
              image_name: "CASA.jpg",
              desc: "H. E. Mr Lorenzo Angeloni, Ambassador of Italy to India and Nepal, (right) and Mr. Alok Singhal, Regional Head – North & East India, inaugurated Casa Italia in a formal ceremony in New Delhi, on 23 May 2019."
            }
          },
          {
            title: "VFS Global wins the coveted Dubai Quality Global Award (DQGA) and achieves 5 Star rating in the Emirates Business Rating Scheme (EBRS) at the 25th Annual Business Excellence Awards",
            image_desc: {
              image_name: "DGQA.jpg",
              desc: "His Highness Sheikh Mansoor bin Mohammed bin Rashid Al Maktoum (centre) bestowing the Dubai Quality Global Award (DQGA) – for Service Sector on Zubin Karkaria, Chief Executive Officer, VFS Global Group, (right) at the awards ceremony held in Dubai on 2 April 2019."
            }
          },
          {
            title: "VFS Global participates in Turkey Tourism Roadshow held in Mumbai, India",
            image_desc: {
              image_name: "Turkey-Tourism-Roadshow.jpg",
              desc: "Mr Emin Çakmak, Chairman, Turkish Indian Tourism Council (centre) with the participants of the Turkey Tourism roadshow in Mumbai, India."
            }
          },
          {
            title: "VFS Global participates in South African Tourism Roadshow held in Mumbai",
            image_desc: {
              image_name: "South-African-Tourism-Roadshow.jpg",
              desc: "Representatives of the South African Consulate and South African Tourism, along with team members of VFS Global, at the roadshow in Mumbai, India."
            }
          },
          {
            title: "Slovakia Visa Application Centre inaugurated in New Delhi, India",
            image_desc: {
              image_name: "Slovakia.jpg",
              desc: "	H.E. Mr Ivan Lančarič, Ambassador Extraordinary and Plenipotentiary of the Slovak Republic in New Delhi (left) and Mr Alok Singhal, Regional Head- North & East India, Bangladesh, Bhutan, Israel, Nepal and Palestine, VFS Global (right) inaugurating the Slovakia Visa Application Centre in New Delhi."
            }
          },
          {
            title: "Thailand eVisa service announcement",
            image_desc: {
              image_name: "Thai-Evoa.jpg",
              desc: "Dignitaries at the announcement of the Thailand E-Visa on Arrival service from left to right - Mr Ekniti Nitithanprapas (Thai Airways Chairman), Mr Weerasak Kowsurat (Minister of Tourism and sports), Mr Arkhom Termpittayapaisith (Ministry of Transport), General Prawit Wongsuwan (Deputy Prime Minister and Minister of Defense), Pol Lieutenant General Surachate Hakparn (commissioner of Immigration Bureau), Mr Jiten Vyas (Regional Group Chief Operating Officer), Mr Nitinai Sirismatthakarn (President of Airport of Thailand PLC), and Mr Sumeth Damrongchaitham (Managing Director Dhanarak Asset Development Co. Ltd). It will be available for eligible travellers from 21 countries."
            }
          },
          {
            title: "Inauguration of the Greece Visa Application Centre in Riyadh",
            image_desc: {
              image_name: "Greece-KSA.jpg",
              desc: "The centre in Riyadh, Kingdom of Saudi Arabia, was inaugurated on 22 January, by H E Mr Loannis Taghis, Ambassador, Extraordinary and Plenipotentiary of Greece, the Kingdom of Saudi Arabia (fourth from left)."
            }
          },
          {
            title: "Inauguration of newly relocated Joint Visa Application Centre in Bangkok",
            image_desc: {
              image_name: "JVAC-Bangkok.jpg",
              desc: "The newly relocated centre was inaugurated, in Bangkok, Thailand on 24 January 2019 in the presence of eminent dignitaries from the respective Missions and representatives of VFS Global."
            }
          },
          {
            title: "First Slovakia Visa Application Centre launched in the Middle East",
            image_desc: {
              image_name: "Slovakia-Kuwait.jpg",
              desc: "(Far right) Mr Martin Kardoš, Chargé d’affaires ad interim of the Embassy of the Slovak Republic in the State of Kuwait, inaugurating the centre in Kuwait City on 17 December 2018."
            }
          },
          {
            title: "VFS Global expands Chinese Visa Application Service Center network in Africa",
            image_desc: {
              image_name: "China-Egypt.jpg",
              desc: "The centre in Cairo, Egypt was inaugurated by HE Ambassador Song Aiguo (left) and Zubin Karkaria, CEO VFS Global Group, on 17 December 2018"
            }
          },
          {
            title:
              "The Netherlands Passport and ID Application Centre operated by VFS Global opened in London on 10 January 2019",
            image_desc: {
              image_name: "London.jpg",
              desc:
                "Seen in the photo are HE Simon Smits, Ambassador of the Kingdom of the Netherlands to the UK (second from right) and Mr Chris Dix, Head of Business Development, VFS Global (extreme right), along with senior members of the Dutch Ministry of Foreign Affairs and VFS Global."
            },
            image_style: {
              "background-position": "center 36%"
            }
          },
          {
            title: "Inauguration of German Visa Application Centre in Kuwait",
            image_desc: {
              image_name: "marita.jpg",
              desc:
                "(From left) Mr Anas Issa Alshaheen - Deputy Assistant Foreign Minister for Consular Affairs Kuwait (third from left), HE Mr Karlfried Berger - Ambassador of Germany to the State of Kuwait (fourth from left) and Ms Marita Bachhav - Head of Operations - Kuwait, Oman, Qatar, Lebanon, Jordan & Iraq, VFS Global (extreme right), inaugurating the new German Visa Application Centre in Kuwait City on 24 October 2018."
            }
          },
          {
            title: "Relocation of the Joint Visa Application Centre in Senegal",
            image_desc: {
              image_name: "jvac-inauguration-senegal.jpg",
              desc:
                "(From left) Honourable Consular General Italy Mr Giuliano Papi (third from right),Honourable Consular General France Mr Olivier Serot Almeras (centre), and Honourable Consular General Netherlands Mr Mario Glaudemans (third from left), at the inauguration of the newly relocated Joint Visa Application Centre in Dakar, Senegal on 23 October 2018."
            }
          },
          {
            title:
              "VFS Global opens new Joint Visa Application Centre in Riyadh, Saudi Arabia",
            image_desc: {
              image_name:
                "VFS-global-opens-new-joint-visa-application-centre.jpg",
              desc:
                "(From left) Mr Atul Marwah – Regional Head – Middle East, VFS Global; Mr Gareth Elks - Regional Manager, Gulf, Iran, Pakistan and Yemen, MENACAPT Region; Ms Johanna Hopkins - First Secretary & Consul, Embassy of Australia, Riyadh; HE Simon Collis – Ambassador of United kingdom to Saudi Arabia; Turki Hassan Ibrahim – Head of Operations, Middle East; inaugurating the new Joint Visa Application Centre in Riyadh, on 17 September 2018."
            }
          },
          {
            title:
              "Visit at the Greece Visa Application Centre in Beirut, Lebanon",
            image_desc: {
              image_name: "visit-at-the-greece-visa-application-centre.jpg",
              desc:
                "(From left) Mr Tarek Boukarroum , Country Manager Lebanon and Jordan, VFS Global, HE Mr Franciscos Verros, Ambassador of Greece  in Lebanon, and Mr Athanasios Leousis , Head of Consular Section for Greece in Lebanon; at the Greece Visa Application Centre in Beirut, on 11 September 2018."
            }
          },
          {
            title:
              "Inauguration of Georgia Visa Application Centre in Colombo, Sri Lanka",
            image_desc: {
              image_name: "inauguration-of-georgia-visa-application-centre.jpg",
              desc:
                "The Georgia Visa Application Centre in Colombo being inaugurated by HE Mr Archil Dzuliashvili, Ambassador of Georgia to India, Bangladesh, Maldives, Nepal, Sri Lanka, and Thailand, on 4 September 2018."
            }
          },
          {
            title: "Belgium Visa Application Centre launched in Jordan",
            image_desc: {
              image_name:
                "belgium-visa-application-centre-launched-in-jordan.jpg",
              desc:
                "(From left) Tarek Boukarroum , Country Manager, Lebanon and Jordan, VFS Global, H E Hendrik Van De Velde Ambassador of Belgium in Jordan, and Wael Sadaqa – CEO, Madarek; during the inauguration of the Belgium Visa Application Centre in Amman, Jordan on 3 September 2018."
            }
          },
          {
            title: "Italy partners with VFS Global in Bahrain",
            image_desc: {
              image_name: "italy-partners.jpg",
              desc:
                "Mr Atul Marwah, Regional Head, Middle East, VFS Global (left) and HE Domenico Bellato, Ambassador, Embassy of Italy to the Kingdom of Bahrain; at the signing held on 19 July 2018. The Italy operations will commence in Bahrain on 1 October 2018."
            }
          },
          {
            title:
              "VFS Global wins SAP ACE 2018 awards, for Strategic HR & Talent Management",
            image_desc: {
              image_name: "ace-2018.JPG",
              desc:
                "At the annual SAP ACE Awards 2018 held in Mumbai, India on 20 April 2018, VFS Global won the Award for Strategic HR & Talent Management. The IT and HR team representatives from VFS Global received the award on behalf of VFS Global, in a glitzy ceremony held at St. Regis, Mumbai."
            }
          },
          {
            title:
              "Ukraine Visa Application Centres launched in Riyadh and Jeddah",
            image_desc: {
              image_name: "Ukraine-in-KSA.JPG",
              desc:
                "(Left to right) Mr Serhii Pushkarsky, Deputy Head of Mission of the Embassy of Ukraine in the Kingdom of Saudi Arabia, Mr Syed Shahen Shah – Country Manager – KSA & Bahrain, VFS Global, and Mr Yurii Tereschenko – Head of Consular Section of the Embassy of Ukraine in the Kingdom of Saudi Arabia; inaugurating the new Ukraine Visa Application Centre in the Kingdom of Saudi Arabia on 15 July 2018."
            }
          },
          {
            title:
              "First Sudan Visa application Centre launched in the Kingdom of Saudi Arabia",
            image_desc: {
              image_name: "First-Sudan.jpg",
              desc:
                "(Second from left) HE Mr Abdulbasit Badawi Al-Sanousi, Ambassador of the Republic of Sudan to the Kingdom of Saudi Arabia inaugurating the first Sudan Visa Application Centre in Riyadh on 15 July 2018."
            }
          },
          {
            title:
              "Ireland opens first Visa Application Centre in Abu Dhabi, UAE, in Partnership with VFS Global",
            image_desc: {
              image_name: "Ireland-Visa.jpg",
              desc:
                "(From left) Ms Miriam Hughes Visa Office Manager Embassy of Ireland Abu Dhabi - UAE, HE Paul Kavanagh, Ambassador Embassy of Ireland Abu Dhabi – UAE and Melvin Duart Dsouza – Head of Operations UAE & Iran; inaugurating the Ireland Visa Application Centre in Abu Dhabi on 29 June 2018."
            }
          },
          {
            title:
              "Inauguration of the Ukraine Visa Application Centre in Amman, Jordan",
            image_desc: {
              image_name: "Tarek-jordan.jpg",
              desc:
                "(From left) Mr Oleksii Sluka, Consul in Ukraine Embassy in Jordan and Mr Tarek Boukarroum, Country Manager Lebanon and Jordan, VFS Global at the inauguration of the Ukraine Visa Application Centre in Amman on 20 June 2018."
            }
          },
          {
            title:
              "The Republic of Singapore partners with VFS Global in the US",
            image_desc: {
              image_name: "Republic-Singpore.jpg",
              desc:
                "(Mr Darryl Lau, Consul General of the Consulate-General of the Republic of Singapore in San Francisco (left) and Mr Bernard Vijaykumar Regional Head Americas, at the signing held on 15 June 2018. The partnership was to launch the first Singapore Visa Application Centre in the US in San Francisco."
            }
          },
          {
            title:
              "Showcasing the Mobile Visa Application Centre in Bangkok, Thailand",
            image_desc: {
              image_name: "bangkok-mobile.jpg",
              desc:
                "(From left) Regional Operations Manager - Mr Robin  Humphries; Her Majesty’s Ambassador to Thailand, Brian Davidson, and Customer  Services Manager- Mr Sebastian Kay; with the new state-of-the-art mobile visa  application centre (MVAC) at the British Embassy in Bangkok."
            }
          },
          {
            title:
              "Inauguration of the Georgia Visa Application Centre in Dhaka, Bangladesh",
            image_desc: {
              image_name: "Bang-landing_event.jpg",
              desc:
                "Mr Sharad Gowani - Head of Operations, Israel, Palestine, Bangladesh & Special Projects (left) and Ambassador Extraordinary and Plenipotentiary of Georgia – H E Archil Dzuliashvili; inaugurating the Georgia Visa Application Centre in Dhaka on 20 May 2018."
            }
          },
          {
            title:
              "State-of-the-art Medical Examination Center for Residency Visas launched at Dragon Mart 2 in Dubai, UAE",
            image_desc: {
              image_name: "DUBAI-landing_event.jpg",
              desc:
                "Dr Abdulaziz Al Zarooni, Deputy Director of Dubai Medical District - Ministry of Health and Prevention (extreme left); Dr Hussain Al Rand, Assistant Undersecretary of Health Centers and Clinics Sector - Ministry of Health and Prevention (third from left); Mr Adnan Hegrat, Advisor  – Nakheel Malls (fourth from left) and Mr Vinay Malhotra, Regional Group COO – Middle East, South Asia & China – VFS Global (second from left) inaugurating the new Medical Examination Center for Residency Visas at Dragon Mart 2 in Dubai on 26 April 2018."
            }
          },
          {
            title: "VFS Global participated at GETEX 2018 held in Dubai, UAE",
            image_desc: {
              image_name: "GETEX.jpg",
              desc:
                "VFS Global participated at GETEX (The Gulf Education and Training Exhibition) 2018, held from 12 April 2018 - 14 April 2018 in Dubai. The team interacted with students and potential travellers, to educate them on exclusive packages designed to make their visa application process more convenient and easy. Special attestation packages were also offered to students applying for their visas."
            }
          },
          {
            title:
              "Inauguration of the China Visa Application Centre in Antananarivo, Madagascar",
            image_desc: {
              image_name: "Madagascar.jpg",
              desc:
                "(Left to right) Mr Hariprasad Viswanathan, Regional Head - South, Central, East Africa, VFS Global; Mr Chen Xiaolei, Chargé d'Affaires a.i., Chinese Embassy in Madagascar and Mr Randriantoandro Eric – Director Bilateral, Ministry of Foreign Affairs, Madagascar; inaugurating the China Visa Application Centre in Antananarivo, on 20 April 2018."
            }
          },
          {
            title:
              "Inauguration of the Germany Visa Application Centre in Muscat, Oman",
            image_desc: {
              image_name: "oman.jpg",
              desc:
                "(Left to right) HE Mr Thomas F Schneider - Ambassador of the Federal Republic of Germany to Oman; Mr Umesh Paliath – Regional Manager, BD & Projects and Mr Anil Khimji – Director, Khimji Ramdas LLC; at the official inauguration of the new German Visa Application Centre in Muscat, Oman on 18 April 2018."
            }
          },
          {
            title:
              "VFS Global participates in the prestigious Riyadh Travel Fair 2018",
            image_desc: {
              image_name: "Riyadh.jpg",
              desc:
                "Representatives at the dedicated counter VFS Global stall offering customers exclusive services and packages at the Riyadh Travel Fair 2018 held from 10 April 2018 – 13 April 2018."
            }
          },
          {
            title: "German Visa Application Centre  launched in Doha, Qatar",
            image_desc: {
              image_name: "qat.jpg",
              desc:
                "Mr Daniel Prinz, Head of Consular Section from  Embassy of Federal Republic of Germany in the State of Qatar (extreme right);  HE Mr Hans-Udo Muzel, Ambassador of Federal Republic of Germany in the State of  Qatar (second from right); HE Ambassador Muhammad Abdullah Saeed Al-Subaei,  Head of the Consular Department of the Ministry of Foreign Affairs of the State  of Qatar (third from right) and  HE Mr  Willy Kempel, Ambassador of Austria in Qatar (fourth from right) at the  official opening of the German Visa Application Centre in Doha, on 15 April  2018."
            }
          },
          {
            title:
              "Inauguration of the Malaysia One Stop Visa Centre in Riyadh, KSA",
            image_desc: {
              image_name: "malaysia-riyadh.jpg",
              desc:
                "(From second left) Marita Bachhav- Head of Operations – KSA, Bahrain, Kuwait, Lebanon & Jordan – VFS Global; Dato’ Mohammad Ali Bin Selamat – Consul General Of Malaysia – Jeddah; Mr Mohammad Fuad Ramli Bin Ab Hadi - Sr Executive, Business Development –S5;\n      Mr Turki Hassan Ibrahim – Head of Operations Middle East – Etimad Modern Business Solution Co and Mr Issam Haji – Senior Operations Manager - Jeddah - Etimad Modern Business Solution Co; inaugurate the OSC in Riyadh, Saudi Arabia, on 12 April 2018."
            }
          },
          {
            title:
              "Inauguration  of the new German Visa Application Centre in Manama, Bahrain",
            image_desc: {
              image_name: "Bah1.jpg",
              desc:
                "H E Mr Alfred  Simms-Protz, Ambassador of the Federal Republic of Germany to the Kingdom of  Bahrain (fourth from left) and Ms Marita Bachhav – Head of Operations – KSA,  Bahrain, Kuwait, Lebanon & Jordan, VFS Global (third from left),  inaugurating the new Germany Visa application Centre on 09 April 2018 in  Manama, Bahrain."
            }
          },
          {
            title:
              "Exclusive media roundtable held at Mumbai, India, by VFS Global in collaboration DIFC Wills Service Centre",
            image_desc: {
              image_name: "media.jpg",
              desc:
                "(From left) Mr Manpreet Singh Arora, Head of Operations, Identity & Citizen Services, VFS Global, and Mr Sean Hird, Director, DIFC Wills Service Centre, building awareness on inheritance protection for Indian investors in the UAE at the event held in Mumbai on 08 March 2018."
            }
          },
          {
            title:
              "Press event held exclusively for media in Kochi, India, to build awareness on inheritance protection for Indians with assets in the UAE",
            image_desc: {
              image_name: "press.jpg",
              desc:
                "(From left) Mr Sean Hird, Director, DIFC Wills Service Centre, and Mr Manpreet Singh Arora, Head of Operations, Identity & Citizen Services, VFS Global, at the exclusive media roundtable held in Kochi on 06 March 2018."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Amman, Jordan",
            image_desc: {
              image_name: "ukraine-2.jpg",
              desc:
                "(From left) Mr Oleksii Sluka , Consul; HE Dr Serhiy Pasko Ambassador of Ukraine in Jordan and Mr Tarek Boukarroum, Country Manager, Lebanon and Jordan, VFS Global at the Joint Visa Application Centre in Amman, on 05 March 2018."
            }
          },
          {
            title:
              "Contract extension between Embassy of Malta in China and VFS Global",
            image_desc: {
              image_name: "China-1.jpg",
              desc:
                "(From left) Mr Daniel Sammut, First Secretary & Consul of Malta Embassy in Beijing, HE Mr John Aquilina, the Ambassador of Malta Embassy in Beijing, Mr Srinarayan Sankaran, COO China, VFS Global and Mr Rishi Das, Head Schengen Operations China, VFS Global, at the contract extension signing in Beijing, on 02 March 2018."
            }
          },
          {
            title:
              "Inauguration of the Austria Visa Application Centre in Sao Paulo, Brazil",
            image_desc: {
              image_name: "IMG-0363.jpg",
              desc:
                "(Extreme left) Mr Klaus Gerstenmayer, General Consul, inaugurating the Austria Visa Application Centre in Sao Paulo, on 01 March 2018."
            }
          },
          {
            title:
              "Launch of the On Demand Mobile Visa service for UK visa applicants in Dhaka, Bangladesh",
            image_desc: {
              image_name: "UkDhaka.jpg",
              desc:
                "(From left)  Mr Michael Lutz, Regional Manager - South and Southeast Asia - UK Visas and  Immigration; Ms Ambrina Bashar, Head of Operations – Bangladesh, VFS Global; Mr  Kanbar Hossein Bor, Deputy High Commissioner - British High Commission Dhaka,  Bangladesh; Mr Brendan Fitzpatrick, Team Leader - Dhaka Enrichment Team - UK  Visas and Immigration, Dhaka and Mr. Lloyd D’souza, Deputy General Manager -  Operations - VFS Global; at the launch of the On Demand Mobile Visa service in  Dhaka for UK visa applicants, on 20 February 2018."
            }
          },
          {
            title:
              "Inauguration of the Austria Visa Application Centre in Amman, Jordan",
            image_desc: {
              image_name: "Amman-Jordan.jpg",
              desc:
                "(From left)  Ms Marita Bachhav, Head of Operations - KSA, Kuwait, Bahrain, Lebanon, Jordan,  VFS Global;\n      Mr Christoph  Sternat - Deputy Head of Mission and Mr Wael Sadaqa – CEO, Madarek; at the inauguration  of the Austria Visa Application Centre in Amman, on 19 February 2018."
            }
          },
          {
            title:
              "Inauguration of the Cyprus Visa Application Centre in Goa, India",
            image_desc: {
              image_name: "Cyprus_L.jpg",
              desc:
                "HE Mr Demetrios A Theophylactou, High Commissioner of Cyprus to India inaugurating the Cyprus Visa Application Centre in Goa, on 16 February 2018."
            }
          },
          {
            title:
              "Inauguration of the Latvia Visa Application Centre in Abu Dhabi, UAE",
            image_desc: {
              image_name: "Ribon-Cutting.jpg",
              desc:
                "HE Ms Astra Kurme, Ambassador of Latvia to the UAE (left), and Mr Melvin Duart Dsouza, Head Of Operations - UAE, VFS Global (right), inaugurating the Latvia Visa Application Centre in Abu Dhabi, on 1 February 2018."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Accra, Ghana",
            image_desc: {
              image_name: "ghana-accra.jpg",
              desc:
                "H. E. Ron Strikker, Ambassador of Netherlands in Ghana (left) inaugurates the new Netherlands Visa Application Centre in Ghana, on 25 January 2018."
            }
          },
          {
            title:
              "Inauguration of the Czech Republic Visa Application Centre in Goa, India",
            image_desc: {
              image_name: "vfs-czech-Goa.jpg",
              desc:
                "HE Mr Milan Hovorka, Ambassador of the Czech  Republic to India (centre) inaugurates the new Czech Republic Visa Application  Centre in Goa, on 18 January 2018."
            }
          },
          {
            title:
              "Inauguration of the Ukraine Visa Application Centre in Beirut, Lebanon",
            image_desc: {
              image_name: "Ukraine-pic.jpg",
              desc:
                "(From left) Mrs Marita Bachhav, Head of Operations – KSA, Kuwait, Bahrain, Lebanon & Jordan, VFS Global; HE Mr Ihor Ostash, Ambassador of Ukraine in Lebanon and Mr Yurii Kasianov, Council of Ukraine Embassy in Lebanon; inaugurating the new Ukraine Visa Application Centre in Beirut, Lebanon on 16 January 2018."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Yangon, Myanmar",
            image_desc: {
              image_name: "Netherlands_Myanmar.jpg",
              desc:
                "(From left) Mr Martin  Groenstege, Head of Administration and Consular Affairs, HE Mr Wouter Jurgens, Ambassador  of the Kingdom of the Netherlands, and Mr Ferdinand D’Souza, VFS Global Country  Manager, Cambodia & Myanmar; inaugurating the Netherlands Visa Application  Centre in Yangon, on 15 January 2018."
            }
          },
          {
            title:
              "VFS Global signs contract with the Embassy of the Republic of Singapore in Moscow",
            image_desc: {
              image_name: "Singapore.jpg",
              desc:
                "Mr Jonathan Tan, First Secretary (Admin & Consular), Embassy of the Republic of Singapore to the Russian Federation Ministry of Foreign Affairs (right), and Prabuddha Sen, Regional Head CIS & Eastern Europe, VFS Global; at the signing held in Moscow, on 22 December 2017. The partnership facilitates Singapore visa processing services in Moscow and St. Petersburg."
            }
          },
          {
            title:
              "House of Justice Registration Centre inaugurated in Kharkiv, Ukraine",
            image_desc: {
              image_name: "Justice.jpg",
              desc:
                "(From right) Mr Stanislav Kustenko - Head of Regional Kyiv Department of Ministry of Justice; Ms Olena Sukmanova - Deputy Minister of Justice of Ukraine for State Registration; Mr Amit Kumar Sharma - Head of Operations – CIS & Eastern Europe, VFS Global; Mr Oleksiy Olehko – General Director of SE,Ministry of Justice; inaugurating the House of Justice Registration Centre in Kharkiv, on 13 December 2017."
            }
          },
          {
            title: "Visit at the Visa Application Centre in Amman, Jordan",
            image_desc: {
              image_name: "Germany-Visit.jpg",
              desc:
                "Mr Mario-Ingo Soos, Head of Division , Organization of Visa Sections,(second from left); Ms Sandra Decker, Council /Head of Visa Section in Amman,(second from right); Mr Ralf Reuter, Assistant Desk Officer, Optimisation of Visa procedures /Organizational Consultancy for Visa Sections, (extreme right); visited the Visa Application Centre in Amman, on 13 December 2017."
            }
          },
          {
            title:
              "New Ghana Passport Biometrics Enrollment Center inaugurated in Chicago, US",
            image_desc: {
              image_name: "America.jpg",
              desc:
                "(From left to right) The Center was inaugurated by Hon Prof Samuel K Amoako, Ghana Consul General –Incoming; Nilambari Sheth- Regional Head, North America and the Caribbean, VFS Global, and Hon Bernard KB Quantson, Ghana Consul General – Outgoing; in Chicago, on 8 December 2017."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Riyadh, Saudi Arabia",
            image_desc: {
              image_name: "Riyadh-s.jpg",
              desc:
                "Mr Keith Vaz, MP – Chair of the Home Affairs Committee (UK Visas & Immigration) (third from right); visited the UK Visa Application Centre in Riyadh, on 6 December 2017."
            }
          },
          {
            title:
              "Visit at the Joint Schengen Visa Application Centre in Colombo, Sri Lanka",
            image_desc: {
              image_name: "Joint-Schengen-Colombo.jpg",
              desc:
                "Ms Claudette Jayamanne, Executive Consular Officer, Norway Embassy in Colombo (second from left) And Ms Tanya Berit Nilsen, Head of Visa Section, Norway Embassy in Colombo (second from right); visited the Joint Schengen Visa Application Centre in Colombo, on 5 December 2017."
            }
          },
          {
            title:
              "Visit at the Joint Schengen Visa Application Centre in Colombo, Sri Lanka",
            image_desc: {
              image_name: "Joint-Schengen-Picture.jpg",
              desc:
                "(From right to left) Ms Regula Lemus Polania, Head of Visa Section, Embassy of Switzerland in Colombo; Ms Ursula Hafeli, Audit KD Headquarter and Ms Laura Wayllay, State Secretariat Of Migration (SEM) Audit; along with VFS Global officials at the Joint Visa Application Centre in Colombo during a planned audit on 1 December 2017."
            }
          },
          {
            title:
              "Inauguration of the Canada and New Zealand Visa Application Centre in Pretoria, South Africa",
            image_desc: {
              image_name: "Ribbon-Cutting.jpg",
              desc:
                "(From right) Mr Jiten Vyas, COO - Africa, VFS Global; HE Ms Sandra McCardell, High Commissioner of Canada; HE Mr Mike Burrell, High Commissioner of Immigration New Zealand and Mr Hariprasad Vishwanath, Regional Head – South, Central and East Africa, VFS Global; inaugurating the Canada and New Zealand Visa Application Centre in Pretoria, on 29 November 2017."
            }
          },
          {
            title:
              "Exclusive Middle East road shows for CzechTourism successfully concluded in Dubai",
            image_desc: {
              image_name: "Dubai.jpg",
              desc:
                "HE Mr Alexandr Sporýš, Ambassador of the Czech\n      Republic to the United Arab Emirates (left), along with Ms Monika Palatková, Managing Director of the Czech Tourist Authority – CzechTourism (right), interacting with the media at the exclusive event and Press Meet held in Dubai on 23 November 2017, which followed similar road shows held in Iran and Kuwait."
            }
          },
          {
            title:
              "‘Czech Republic – Land of Stories’, the official promotion campaign of the Czech Republic, road show event held in Iran",
            image_desc: {
              image_name: "Iran.jpg",
              desc:
                "HE Mr Svatopluk Čumba, Ambassador of the Czech Republic to Iran, at the road show event for the ‘Czech Republic – Land of Stories’ campaign,  conducted by CzechTourism in collaboration with VFS Global, in Iran on 21 November 2017."
            }
          },
          {
            title:
              "CzechTourism senior officials at the 'Czech Republic - Land of Stories' road show event in Kuwait",
            image_desc: {
              image_name: "Kuwait.JPG",
              desc:
                "CzechTourism in collaboration with VFS Global presented a wide range of tourism attractions to travel, trade and business partners in Kuwait at an exclusive road show event held on 19 November 2017."
            }
          },
          {
            title:
              "Inaugurating the Italy Visa Application Centre in Kuwait City, Kuwait",
            image_desc: {
              image_name: "Italy-kuwait-event.jpg",
              desc:
                "HE Mr Giuseppe Scognamiglio, Ambassador of the Embassy of Italy to the State of Kuwait (right) and Ms Yummi Talwar, Regional Head –Middle East, VFS Global (left); inaugurating the new Italy Visa Application Centre in Kuwait on 23 November 2017."
            }
          },
          {
            title:
              "Inaugurating the Czech Republic Visa Application Centre in Tehran, Iran",
            image_desc: {
              image_name: "Pic-1-Czech.jpg",
              desc:
                "HE Mr Svatopluk Čumba, Ambassador of the Czech Republic to Iran (second from right) and First Secretary, Ms Zuzana Marková, Consular and Cultural Affairs (second from left), at the inauguration of the new Czech Republic Visa Application Centre in Tehran, on 19 November 2017."
            }
          },
          {
            title:
              "Inaugurating the Austria Visa Application Centre in Tehran, Iran",
            image_desc: {
              image_name: "Austria-Offical-Opening-Iran.jpg",
              desc:
                "(Second from right) Mag. Karl-August Lux, Senior Expert - Visa Matters, Legal & Consular Affairs; inaugurated the Austria Visa Application Centre in Tehran, on 30 October 2017."
            }
          },
          {
            title:
              "Inauguration  of the UK Visa Application Centre - Premium Lounge in Bengaluru, India",
            image_desc: {
              image_name: "uk-Bengaluru.jpg",
              desc:
                "(Right to  left) Rt Hon Brandon Lewis MP, Minister of State (Immigration and  International), United Kingdom; Mr Dominic McAllister, British Deputy High  Commissioner, Bengaluru and Mr Nick Crouch, Regional Director, UK Visas and  Immigration inaugurated the UK Visa Application Centre - Premium Lounge, in  Bengaluru on 7 November 2017."
            }
          },
          {
            title:
              "Inaugurating the Finland Visa Application Centre in Abu Dhabi, UAE",
            image_desc: {
              image_name: "Finland.jpg",
              desc:
                "HE Ms. Riitta Swan, Ambassador of Finland to the United Arab Emirates (right), and Ms Yummi Talwar, Regional Head – Middle East, VFS Global (left), inaugurating the new Finland Visa Application Centre in Abu Dhabi on 16 November 2017."
            }
          },
          {
            title:
              "Visit at the Joint Schengen Visa Application Centre in Colombo, Sri Lanka",
            image_desc: {
              image_name: "Raxit.jpg",
              desc:
                "Mr Andreas Lauber, State Secretariat for Migration  (second from left); Ms Sabine Olivier, Deutsch, State Secretariat for Migration  (third from left) and Ms Regula Lemus Polania, Head of Visa Section,  Switzerland Embassy in Colombo (center); along with VFS Global officials at the  Joint Schengen Visa Application Centre in Colombo, on 13 November 2017."
            }
          },
          {
            title:
              "Inauguration of the China Visa Application Center in Beirut, Lebanon",
            image_desc: {
              image_name: "Inauguration-China-Beirut.jpg",
              desc:
                "HE Mr Wang Kejian, Ambassador of the People’s Republic of China to the Republic of Lebanon (centre right) & Mr Vinay Malhotra, COO – Middle East & South Asia, VFS Global (centre left); together with other seniors officials and leadership at the inauguration of the new China Visa Application Center in Beirut, on 10 November 2017."
            }
          },
          {
            title:
              "Visit at the Schengen Visa Application Centre in Doha, Qatar",
            image_desc: {
              image_name: "Qatar-doha.jpg",
              desc:
                "(From center to left) HE Ambassador Ewa Polano, Embassy of Sweden in Doha; Mr Gustaf Hannerz, Deputy Head of Mission at Embassy of Sweden in Doha and Mr Martin Helgesson, First Secretary, Migration Liaison officer at Embassy of Sweden in Abu Dhabi; visited the Schengen Visa Application Centre in Doha, on 8 November 2017."
            }
          },
          {
            title:
              "Inaugurating the new One Stop Centre for Malaysia Visas in Dubai, UAE",
            image_desc: {
              image_name: "Malay.jpg",
              desc:
                "HE Dato’ Yubazlan Bin Hj Yusof, Consul General of Malaysia in Dubai (centre left) and Mr Vinay Malhotra, COO – Middle East & South Asia, VFS Global (centre right); inaugurating the new One Stop Centre for Malaysia Visas in Dubai on 06 November 2017."
            }
          },
          {
            title:
              "Inauguration of the China Visa Application Centre in Algiers, Algeria",
            image_desc: {
              image_name: "Inauguration-china.jpg",
              desc:
                "(From left) Mr Boumediene Guennad,General Manager, Asia – Oceania , Algerian Ministry of foreign affairs; Mr Mohamed Bensabri General Manager, National Community Abroad for the Algerian Ministry of foreign affairs; H E Mr Yang Guangyu, Ambassador of the People’s Republic of China in Algiers; Jiten Vyas, Chief Operating Officer, Africa, VFS Global; Mohamed Slimane, Regional Head, North Africa & Turkey, VFS Global; at the opening of the China Visa Application Centre in Algiers on 30 October 2017."
            }
          },
          {
            title:
              "Unveiling the Finland Visa Application Centre in Pretoria, South Africa",
            image_desc: {
              image_name: "Plaque.jpg",
              desc:
                "(Left) H E Mr Kari Alanko, Ambassador of Finland to The Republic of South Africa unveiling the Finland Visa Application Centre in Pretoria on 23 October 2017."
            }
          },
          {
            title:
              "Inaugurating the Resident Card Application Centre in Abidjan, Ivory Coast",
            image_desc: {
              image_name: "Ribboncut1.jpg",
              desc:
                "(From left) Mr Konate Diakalidia, General Director National Office of Identification ‘ONI’; Mr Vincent Toh Bi, Director of Cabinet of Minister of Interior and Security and Mr Deepak Iyer, Regional Head West Africa, VFS Global inaugurate the Resident Card Application Centre in Abidjan on 19 October 2017."
            }
          },
          {
            title:
              "Inaugurating the Premium Application Centre for UK visas in Seattle, US",
            image_desc: {
              image_name: "Application-center-uk-us.jpg",
              desc:
                "(Center) Mr Robert  Twyman, British Consul for Business and Government Affairs; inaugurates the  Premium Application Centre in Seattle on 12 October 2017."
            }
          },
          {
            title:
              "Inauguration of the House of Justice, Registration Centre in Kiev, Ukraine",
            image_desc: {
              image_name: "inauguration-house-of-justice.jpg",
              desc:
                "(From right) Olena Sukmanova, Deputy Minister of Justice of Ukraine for State Registration; Stanislav Kustenko, Head of Regional Kyiv Department of Ministry of Justice; Oleksiy Olehko, General Director of SE, Ministry of Justice and Amit Kumar Sharma, Head of Operations, CIS & Eastern Europe, VFS Global; during the inauguration of the House of Justice, Registration Centre in Kiev on 18 October 2017."
            }
          },
          {
            title:
              "Inaugurating the India Passport and Visa Application Centre in Jubail, Saudi Arabia",
            image_desc: {
              image_name: "Saudi-india.jpg",
              desc:
                "HE Mr Ahmed Javed, Ambassador of India to the Kingdom of Saudi Arabia (centre) inaugurating the India Passport and Visa Application Centre in Jubail on 15 October 2017."
            }
          },
          {
            title:
              "Inaugurating the DIBP and UK Premium Lounge in Bangkok, Thailand",
            image_desc: {
              image_name: "thailand-india.jpg",
              desc:
                "(From right) Mr Robin Humphris, Operations Manager, South East Asia, Thailand, Cambodia, Burma, Vietnam & Indonesia – British Embassy, Bangkok; Mrs Alison Garrod, Consular (Immigration), Australian Embassy, Bangkok and Mr Sriram Narayan, COO – Australasia, VFS Global; inaugurating the premium lounge for DIBP and UK applicants in Bangkok on 3 October 2017."
            }
          },
          {
            title: "Inaugurating the Czech Tourism India office",
            image_desc: {
              image_name: "Czech-Tourism-India.jpg",
              desc:
                "Mr Vinay Malhotra, COO – South Asia & Middle East,  VFS Global; HE Milan Hovorka, Ambassador, Embassy of the Czech Republic in New  Delhi; Ms Monika Palatková – Managing Director Czech Tourist Authority; Ms Klára  Vysloužilová– Director of foreign offices, Czech Tourist Authority; Mr Arzan  Khambatta – Head, Czech Tourist Authority and Mr Jervis D’souza Head – B2C  Business, VFS Global  along with the  delegation from Czech Republic at the inauguration of the Czech Tourism India  office on 14 September 2017."
            }
          },
          {
            title:
              "Inaugurating the first Chinese Visa Application Service Center in the Middle East in Dubai",
            image_desc: {
              image_name: "Application-Service-Center-Middle-East-in-Dubai.jpg",
              desc:
                "The first Chinese Visa Application Service Centre was inaugurated by Ms Li Lingbing, Consul General of the People’s Republic of China in Dubai; Mr Chen Xiongfeng, Deputy Director – General, The Department of Consular Affairs of the Ministry of Foreign Affairs of the People’s Republic of China; Mr Wei Xiaodong, Deputy Director – General, The Department of Services for the Foreign Ministry Home and Overseas Offices, Ministry of Foreign Affairs of the People’s Republic of China and Mr Zubin Karkaria, Chief Executive Officer, VFS Global Group; at a grand inaugural ceremony held on 12 September 2017."
            }
          },
          {
            title:
              "Inaugurating the Japan Visa Application Centre in Jakarta, Indonesia",
            image_desc: {
              image_name: "Japan-application-Center-Jakarta-Indonatia.jpg",
              desc:
                "Mr Sriram Narayan, COO- Australasia, VFS Global (third from left); HE Mr Masafumi Ishii, Ambassador of Japan to the Republic of Indonesia; Mr Vinsensius Jemadu, Director For Asia Pacific Tourism Promotions, Ministry of Tourism, Republic of Indonesia and Mr Hideki Tomioka, Executive Director, Japan National Tourism Organization Jakarta Office; inaugurating the Japan Visa Application Centre in Jakarta on 8 September 2017."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Kingston, Jamaica",
            image_desc: {
              image_name: "US.jpg",
              desc:
                "HE Asif Ahmad, CMG, British High Commissioner (center in white); along with Claire Dorrian, Head of Operations, North America and Caribbean, VFS Global (fourth from left) and Edward Palmer, Deputy Regional Head, North America and Caribbean, VFS Global (extreme left) at the UK Visa Application Centre at Kingston, Jamaica, on 5 September 2017."
            }
          },
          {
            title:
              "Inauguration of the newly relocated Schengen and South Africa Visa Application Centre in Nairobi, Kenya",
            image_desc: {
              image_name: "SouthAfrica-Kenya.jpg",
              desc:
                "(From right to left) HE Mrs K. Mqulwana, High Commissioner –  South African High Commission; Mr Hariprasad Viswanathan, Regional Head, South,  Central and East Africa - VFS Global Ltd; Ms Gro Snuggerud, Counsellor, Head of  Administratrive and Consular Affairs – Embassy of Norway; Ms Angela, Deputy  Head of Mission – Embassy of Italy; Ms Britt, Consul – Embassy of Denmark; Mrs  Barbro Ekvall, First Secretary, Head of Migration/Visa Section – Embassy of  Sweden, inaugurating the newly relocated Schengen and South Africa Visa  Application Centre in Nairobi on 26 July 2017."
            }
          },
          {
            title:
              "Inaugurating the Czech Visa Application Centre in Gurugram, India",
            image_desc: {
              image_name: "czech-gurugram.jpg",
              desc:
                "Mrs Baharvand Benetková, Head of Consular and Visa Section, Embassy of the Czech Republic, and Mr Milan Hovorka, Ambassador of the Czech Republic to India, inaugurating the Czech Republic Visa Application Centre operated by VFS Global in Gurugram, on 25 July 2017."
            }
          },
          {
            title:
              "Inaugurating the Russia Visa Application Centre in Ottawa, Canada",
            image_desc: {
              image_name: "Russia-Visa-Application-Ottawa.jpg",
              desc:
                "The VFS Global Russia Visa Application Centre in Ottawa being inaugurated by HE Alexander Darchiev, Ambassador of the Russian Federation in Canada along with Ms Nilambari Sheth, Regional Head - North America and the Caribbean."
            }
          },
          {
            title:
              "Inaugurating the Czech Visa Application  Centre in Chandigarh, India",
            image_desc: {
              image_name: "CzechVisa-chandigad-india.jpg",
              desc:
                "The VFS Global Czech Republic Visa  Application Centre in Chandigarh being inaugurated by HE Mr Milan Hovorka,  Ambassador of the Czech Republic in India, (second from right) at a ceremony  held on 5 July 2017."
            }
          },
          {
            title: "Visit at the Visa Application Centre in Jordan",
            image_desc: {
              image_name: "Visit-in-Jordan.jpg",
              desc:
                "Mr Alfred Bratranek, Counsellor and Consul, (second  from left) and H E Ambassador Micheal Desser, Ambassador of Austria in Jordan,  (second from right); visited the Joint Visa Application Centre in Jordan."
            }
          },
          {
            title:
              "Inaugurating the Germany Visa Application Centre in Bengaluru, India",
            image_desc: {
              image_name: "MSG.jpg",
              desc:
                "(From right to left) Ms Margit Hellwig-Bötte, Consul General of the Consulate General of the Federal Republic of Germany in Bangalore, Mr Jürgen Pengel, Consul and Head of the Consular Department of the Consulate General of the Federal Republic of Germany in Bangalore, and Mr Alok Singhal, Regional Head – South Asia, VFS Global, inaugurating the Germany Visa Application Centre in Bengaluru, on 23 June 2017."
            }
          },
          {
            title: "Two new Premium Application Centres launched in the US",
            image_desc: {
              image_name: "Seattle_Staff.jpg",
              desc:
                "VFS Global, in partnership with UK Visas & Immigration, has launched two new Premium Application Centres in Atlanta and Seattle, US. These latest launches held on 15 June 2017, bring the total PAC network in the United States to a total of 10."
            }
          },
          {
            title:
              "Inaugurating the Georgia Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "Georgia-Visa-Center-Delhi.jpg",
              desc:
                "Mr Giorgi Tabatadze, Director of the Consular Department, Ministry of Foreign Affairs of Georgia (first from left) along with HE Mr Archil Dzuliashvili, Ambassador of Georgia to India (second from left) inaugurated the Georgia Visa Application Centre, operated by VFS Global, in New Delhi, on 5 June 2017."
            }
          },
          {
            title:
              "Inaugurating the Czech Visa Application Centre in Thiruvananthapuram, India",
            image_desc: {
              image_name: "CzechRepublic-India.jpg",
              desc:
                "HE Mr Radek Vondráček, Deputy Speaker of the Chamber of Deputies of the  Parliament of the Czech Republic, (extreme left) and HE Mr Milan Hovorka,  Ambassador of the Czech Republic in India, (third from left) inaugurate the new  Czech Republic Visa Application Centre in Thiruvananthapuram, Kerala, India, on  1 June 2017."
            }
          },
          {
            title:
              "Inaugurating the South Africa Visa Application Centre in Harare",
            image_desc: {
              image_name: "Plaque-Unveiling.jpg",
              desc:
                "HE Mr Mphakama Nyangweni Mbete, Ambassador of the Republic of South Africa to Zimbabwe and Mr Hariprasad Viswanathan – Regional Head, VFS Global – South, Central and East Africa, inaugurating the South Africa Visa Application Centre in Harare on 26 May 2017."
            }
          },
          {
            title:
              "Inaugurating the Netherlands Visa Application Centre in Abu Dhabi",
            image_desc: {
              image_name: "netherlands-event-in-abudhabi.jpg",
              desc:
                "Mr Vinay Malhotra, COO – Middle East & South Asia, VFS Global (centre) and HE Mr Frank J. M. Mollen, Ambassador of the Kingdom of The Netherlands to the United Arab Emirates (right), inaugurating The Netherlands Visa Application Centre in Abu Dhabi on 22 May 2017."
            }
          },
          {
            title:
              "Inaugurating  the Ireland Visa Application Centre in Doha, Qatar",
            image_desc: {
              image_name: "Ireland-In-Qatar-Inaugration.jpg",
              desc:
                "HE Patrick Hennessy, Ambassador of Ireland to Qatar  (second from left), inaugurating the new Ireland Visa Application Centre in  Qatar on 16 May 2017."
            }
          },
          {
            title: "VFS Global wins the IMC Digital Technology Award",
            image_desc: {
              image_name: "award.jpg",
              desc:
                "VFS Global was awarded the IMC Digital Technology Award, under the Digitally Enabled Organization in Large Enterprise Category. The award was presented by Padma Bhushan Shri F.C. Kohli on behalf of IMC (Chambers of commerce & industry). Dhiren Savla, CIO, VFS Global accepted the award on behalf of VFS Global at the award ceremony held in Mumbai."
            }
          },
          {
            title:
              "Inaugurating the Czech Visa Application Centre in Puducherry,  India",
            image_desc: {
              image_name: "Czech-india.jpg",
              desc:
                "HE Mr Milan Hovorka, Ambassador of the Czech Republic to India,  inaugurating the Czech Republic Visa Application Centre operated by VFS Global  in Puducherry, on 08 May  2017."
            }
          },
          {
            title:
              "Inaugurating the Netherlands Visa Application Centre in New York, US",
            image_desc: {
              image_name: "Netherlands-New-York-US.jpg",
              desc:
                "Mr Dolph Hogewoning, Consul-General of The Netherlands Consulate in New York(centre) along with Mr Anil Katoch, COO - Americas, VFS Global (left) & Mr Wim Schippers, Head of Dutch Regional Support Office, Americas; inaugurated the Netherlands Visa Application Centre in New York, on 1 May 2017."
            }
          },
          {
            title: "Signing of Agreement between Gulf Air and VFS Global",
            image_desc: {
              image_name: "gulf-air.jpg",
              desc:
                "Mr. Ahmed Janahi, Chief Commercial Officer, Gulf Air (left), and Mr. Vinay Malhotra, Chief Operating Officer – Middle East & South Asia, VFS Global (right), at the signing held in Dubai, on 26 April 2017. The partnership would facilitate the visa issuance for passengers flying to the Kingdom of Bahrain."
            }
          },
          {
            title: "Inaugurating the Premium Application Centre in Boston, US",
            image_desc: {
              image_name: "Boston-Us.jpg",
              desc:
                "Ms Harriet Cross (second from left), British Consul General; inaugurating the UK Premium Application Centre in New England, Boston, on 19 April 2017."
            }
          },
          {
            title: "Inaugurating the UK Visa Application Centre in Pune, India",
            image_desc: {
              image_name: "UK-Visa-pune.jpg",
              desc:
                "(From Left) Mr Nick Crouch, Regional Director of UK Visas & Immigration for South Asia and South East Asia, inaugurates the new UK Visa Application Centre in Viman Nagar, Pune, along with Mr Alok Singhal, Regional Head of South Asia, VFS Global, on 30 March 2017."
            }
          },
          {
            title:
              "Inaugurating the UK & Ireland Visa Application Centre in Bangalore, India",
            image_desc: {
              image_name: "UK-Ireland.jpg",
              desc:
                "Mr Dominic McAllister, British Deputy High Commissioner - Bengaluru and Ms Sarah Williamson, Regional Operations Manager, South India and Sri Lanka, UKVI, inaugurating the UK & Ireland Visa Application Centre in Bangalore on 28 March 2017."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Amman, Jordan",
            image_desc: {
              image_name: "Belgium-visit.jpg",
              desc:
                "(From left)  Mr Nael Sadaqa, Operation Manager, VFS Global;  Mr Tarek Boukarroum, Country Manager, Lebanon and Jordan, VFS Global; HE Mr Hendrik Van De Velde, Ambassador of Belgium in Jordan; Mr Patrick Eeckhout, Consul; during a visit to the Joint Visa Application Centre in Amman, Jordan, on 15 February 2017."
            }
          },
          {
            title:
              "Inaugurating the Malaysia Visa Application Centre in Makati, Philippines",
            image_desc: {
              image_name: "Makati-philiphins.jpg",
              desc:
                "(From left) Mr Kamal Mohd Nor, Implementation Manager, UKSB SDN BND; Ms Jasneet Gupta, Senior \n      Manager, VFS Global; Mr Akmal Che Mustafa, Deputy Chief of Mission from the Embassy of \n      Malaysia in Manila; Ms Wong Li Kheen, Second Secretary, Malaysian Embassy Manila; Mr Jesal \n      Anada, General Manager, VFS Global, inaugurating the Malaysia Visa Application Centre in \n      Makati, Philippines, on 10 March 2017."
            }
          },
          {
            title: "Visit to the Austria Mission in Tokyo",
            image_desc: {
              image_name: "tokyo.jpg",
              desc:
                "(From left) Mr Andreas Bischofreiter, Intern of Consular of Austria Embassy Tokyo; Mr Johannes Korherr, 2<sup>nd</sup> Secretary (Administrative Affairs) and Consul of Austria Embassy Tokyo; Ms Masumi Watanabe, Country Head for Japan/ Deputy Manager – Operations, VFS Global; Mr Sriram Narayan, Chief Operating Officer, Australasia, VFS Global; Mr Shingo Koretsune, Visa desk officer of Austria Embassy Tokyo, during a meeting at the Austria Mission in Tokyo, Japan, on 22 February 2017."
            }
          },
          {
            title:
              "Inaugurating the Czech Republic Visa Application Centre in Kochi, India",
            image_desc: {
              image_name: "czechrepublic-kochi.jpg",
              desc:
                "(From  left) H.E. Mr Milan Hovorka, Ambassador of the Czech Republic in India, Hon Ms  Soumini Jain, Mayor of Municipal Corporation of Kochi and Mr Martin Smolek,  Deputy Minister of Foreign Affairs of the Czech Republic, inaugurating the  Czech Republic  Visa Application Centre in Kochi on 03 March 2017."
            }
          },
          {
            title:
              "Inaugurating the Czech Republic Visa Application Centre in Jaipur, India",
            image_desc: {
              image_name: "czechrepublic-jaipur.jpg",
              desc:
                "(From left) Mr Pranav Sinha, Head of Operations - South Asia, VFS Global, Mr Martin Smolek, Deputy Minister of Foreign Affairs of the Czech Republic, H.E. Mr Milan Hovorka, Ambassador of the Czech Republic in India and Mr Prabuddha Sen, Regional Head - VFS Global, inaugurating the Czech Republic Visa Application Centre in Jaipur on 02 March 2017."
            }
          },
          {
            title:
              "Inaugurating the South Africa Visa Application Centre in Dubai",
            image_desc: {
              image_name: "South-Africa-Dubai.jpg",
              desc:
                "H.E. Mr. MK Lekgoro, Ambassador of the Republic of South Africa to the United Arab Emirates (second from left), Ms. Shabnam Karachi – Consul – Immigration and Civic Services of the South African Consulate General in Dubai, UAE (centre), Mr. Vinay Malhotra, COO – Middle East & South Asia, VFS Global, (third from left), Mr Melvin Dsouza – Head Of Operations - UAE, VFS Global (extreme left), and Ms Yummi Talwar – Regional Head – Middle East, VFS Global (extreme right), inaugurating the South Africa Visa Application Centre in Dubai on 28 February 2017."
            }
          },
          {
            title:
              "Inauguration of the France Visa Application Centre in Pune, India",
            image_desc: {
              image_name: "France-In-Pune.jpg",
              desc:
                "Mr Yves  Perrin, Consul General of France in Mumbai, inaugurating the newly relocated  France Visa Application Centre in Pune, India on 27 February 2017"
            }
          },
          {
            title:
              "Inauguration of the ‘Chinese Visa  Application Service Center’ and the signing of the MoU to promote ‘China in  Luxury’ travel experiences",
            image_desc: {
              image_name: "China-In-Luxury.jpg",
              desc:
                "(From left) Mr Wei Xiaodong, Vice  Director-General, Service Bureau for the Foreign Ministry And Its Overseas  Missions of the People’s Republic of China, and Mr Zubin Karkaria, Chief  Executive Officer, VFS Global Group, at the inauguration of the ‘Chinese Visa  Application Service Center’ and the signing of the MoU to promote ‘China in  Luxury’ travel experiences, in New Delhi, on 24 February 2017"
            }
          },
          {
            title:
              "Inauguration  of the Japan Visa  Application Centre in Colombo, Sri Lanka",
            image_desc: {
              image_name: "Japan-Vac-Colombo.jpg",
              desc:
                "H.E. Mr  Kenichi Suganuma, Ambassador Extraordinary and Plenipotentiary of Japan to Sri  Lanka, inaugurating the Japan Visa Application Centre in Colombo on 17 February  2017"
            }
          },
          {
            title:
              "Visit at the  Malaysia Visa Application Centre in New Delhi",
            image_desc: {
              image_name: "MALAYSIA-VISIT-DELHI.jpg",
              desc:
                "(From second  left) Delegates from the Malaysian Tourism Ministry, Ms Aireen Omar, Board  Member, Tourism Malaysia; Dato’ Zainol Abidin Omar, Deputy Chairman, Tourism  Malaysia; Datuk Rashidi Hasbullah, Deputy Sec. Gen. Ministry of Tourism and  Culture, Malaysia; Mr Mohd Fardhi Ahmad, Director Visa, Immigration Department  of Malaysia; Datuk Musa Yusof, Senior Director, MOTAC, (fifth from right) Dato’  Sri Mustafar Ali, Director General of Immigration, Malaysia, (fourth from right) Hon Dato’ Seri  Mohamed Nazri bin Aziz, Minister of Tourism and Culture, Malaysia (second from  right) Siti Zulaikha Abdul Wahab, Immigration Attache, New Delhi; at the  Malaysia Visa Application Centre in New Delhi, on 16 February 2017."
            }
          },
          {
            title: "Inaugurating the Belgium Visa Application Centre in Manila",
            image_desc: {
              image_name: "Ribbon_Cutting_Belgium.jpg",
              desc:
                "HE Mr Roland Van Remoortele Ambassador of Belgium to the Philippines (right) and Mr Loren D’Souza, Regional Head– South East Asia & Pacific Rim, VFS Global (left), inaugurating the Belgium Visa Application Centre in Manila on 17 February 2017"
            }
          },
          {
            title:
              "Inaugurating the South Africa Visa Application Centre in Manila",
            image_desc: {
              image_name: "Ribbon_Cutting_South-Africa.jpg",
              desc:
                "HE Mr M N Slabber Ambassador of South Africa to the Philippines (left) and Mr Jesal Anada, General Manager – Operations, VFS Global (right), inaugurating the South Africa Visa Application Centre in Manila on 17 February 2017."
            }
          },
          {
            title:
              "Visit to UK VAC in Bogota during the Customer Service Excellence (CSE) Standard renewal assessment of UKVI Bogota (for Central and South America)",
            image_desc: {
              image_name: "Visit_from_UKVI_and_External_Customer_Service.jpg",
              desc:
                "(From right) Mr Tony Atkins, UKVI Entry Clearance Manager, Bogota; Ms Sonia Fernandez, UKVI Customer Service Excellence (CSE) Manager, UK; Mr Dan O’Donoghue, UKVI Regional Business Manager for the Americas, Mr Hugh Keachie, Customer Service Excellence Standard Assessor at Centre For Assessment (CFA) in Manchester, UK, alongwith VFS Global staff members at the UK Visa Application Centre in Bogota, Colombia on 15 February 2017."
            }
          },
          {
            title: "Inaugurating the Denmark Visa Application Centre in Dubai",
            image_desc: {
              image_name: "Inauguration-denamrk-centre-dubai.jpg",
              desc:
                "HE  Ms Merete Juhl Ambassador of Denmark to the United Arab Emirates and Qatar  (second from left), Mr Joachim Arup Fischer, Deputy Head Of Mission of the  Royal Danish Consulate General in Dubai (second from right), Mr Vinay Malhotra,  COO – Middle East & South Asia, VFS Global (centre), Mr Melvin Dsouza –  Head Of Operations - UAE, VFS Global (extreme left), and Ms Yummi Talwar –  Regional Head – Middle East, VFS Global (extreme right), inaugurating the  Denmark Visa Application Centre in Dubai on 15 February 2017."
            }
          },
          {
            title: "Inauguration of Premium Application Centre in Houston",
            image_desc: {
              image_name:
                "Inauguration-Premium-Application-Centre-Houstoni.jpg",
              desc:
                "The Honorable British Consul General in Houston, Karen  Bell (second from left), alongwith Carol Doughty– Regional Director, Americas, UK Visas & Immigration (second  from right), Daniel ODonoghue – Regional Business Manager, Americas, UK Visa  & Immigration (extreme right) and Edward Palmer -  Deputy Regional Head - North America & Caribbean, VFS Global (extreme  left), inaugurating the VFS Global Premium Application Centre in Houston on 03  February 2017."
            }
          },
          {
            title: "Inauguration of Russia Visa Application Centre in Dubai",
            image_desc: {
              image_name: "Russia-Visa-Application-Centre-Dubai.jpg",
              desc:
                "Mr Gocha Buachidze Consul General of the Russian Federation in Dubai and Northern Emirates (centre-right) and Ms Yummi Talwar, Regional Head – Middle East, VFS Global (centre-left), inaugurating the new Russia Visa Application Centre in Dubai on 22 January, 2017."
            }
          },
          {
            title: "Inauguration of Ireland Visa Application Centre in Kuwait",
            image_desc: {
              image_name: "Ireland-kuwait.jpg",
              desc:
                "HE Mr Patrick Hennessy, Ambassador of Ireland to Kuwait (centre) and Ms Marita Bachhav, Head of Operations - GCC, Lebanon & Jordan, VFS Global (left), inaugurating the Ireland Visa Application Centre in Kuwait, on 19 January 2017."
            }
          },
          {
            title:
              "Inauguration of Czech Visa Application Centre in Ahmedabad, India",
            image_desc: {
              image_name: "Inauguration-india.jpg",
              desc:
                "HE Mr Milan Hovorka, Ambassador of the Czech Republic to India and Ms Monaz Billimoria, Head of Operations – West India, South India & Sri Lanka, VFS Global, inaugurating the Czech Republic Visa Application Centre in Ahmedabad, India, at a ceremony held on 9 January 2017."
            }
          },
          {
            title:
              "President of France François Hollande bestows the prestigious National Order of Merit on VFS Global CEO Zubin Karkaria",
            image_desc: {
              image_name: "France-India.jpg",
              desc:
                "HE Mr Alexandre Ziegler, Ambassador of France to India, confers on Mr. Zubin Karkaria, CEO, VFS Global, the Chevalier de l’Ordre National du Merite (Knight of the National Order of Merit) on behalf of the President of the French Republic François Hollande, on 2 December 2016."
            }
          },
          {
            title:
              "Visit at the Denmark Visa Application Centre in Beijing, P. R. China",
            image_desc: {
              image_name: "denmark-china.jpg",
              desc:
                "Mr. Kim Christiansen (Special Adviser of Consular Department of Ministry of Foreign Affairs of Denmark) and Jens Oluf Petersen visited Denmark Visa Application Centre in Beijing,P. R. China, on 21 November 2016."
            }
          },
          {
            title:
              "Inauguration of the Joint Visa Application Centre in Colombo, Sri Lanka",
            image_desc: {
              image_name: "Sri-Lanka.jpg",
              desc:
                "Mr Bryce Hutchesson (Australian High Commissioner to Sri Lanka) and Mr James Dauris (British High Commissioner to Sri Lanka and Maldives) inaugurating the Joint Visa Application Centre in Colombo, Sri Lanka, on 17 November 2016."
            }
          },
          {
            title:
              "Inauguration of the Czech Republic Visa Application Centre in Kolkata, India",
            image_desc: {
              image_name: "CzechRepublic-India.jpg",
              desc:
                "HE Milan Hovorka (Ambassador of Czech Republic in India) inaugurated the Czech Republic Visa Application Centre in Kolkata, India, on 16 November 2016."
            }
          },
          {
            title:
              "Inauguration of France Visa Application Centre in Muscat, Oman",
            image_desc: {
              image_name: "France-in-Oman.jpg",
              desc:
                "HE Roland Dubertrand (Ambassador of France to the Sultanate of Oman)and Ms Yummi Talwar (Regional Head – Middle East, VFS Global) inaugurated the France Visa Application Centre in Muscat, Oman, on 9 November 2016."
            }
          },
          {
            title:
              "Visit at the Ireland Visa Application Centre in Beijing, P. R. China",
            image_desc: {
              image_name: "Ireland-China.jpg",
              desc:
                "Delegates from the Irish Naturalisation and Immigration Service (INIS), including Mr Gerry McDonagh (Principal Officer, Visa Division); Mr Tony Flynn (Assistant Principal Officer, Visa Division) accompanied by Mr Ian Murphy (Visa Officer, Embassy of Ireland, Beijing) visited the  Ireland Visa Application Centre in Beijing, P. R. China, on 9 November 2016."
            }
          },
          {
            title:
              "Visit at the Croatia Visa Application Centre in Beijing, P. R. China",
            image_desc: {
              image_name: "croatia-china.jpg",
              desc:
                "Mr Kresimir Jurinec (Consul, Embassy  of the Republic of Croatia in the People's Republic of China) accompanied by delegates from the Ministry of  Foreign Affairs of Croatia visited the Croatia Visa  Application Centre in Beijing, P. R. China, on 8 November 2016."
            }
          },
          {
            title:
              "Inauguration of Turkey Visa Application Centre in Doha, Qatar",
            image_desc: {
              image_name: "Doha_Qatar.jpg",
              desc:
                "HE Mr Ahmet Demirok (Ambassador of Republic of Turkey to the State of Qatar); and Ms Marita Bachhav (Head of Operations – GCC, Lebanon, Jordan, VFS Global) inaugurated the Turkey Visa Application Centre is Doha, Qatar, on 3 November 2016."
            }
          },
          {
            title:
              "Inauguration of the UK Premium Application Centre in Miami, USA",
            image_desc: {
              image_name: "Miami.jpg",
              desc:
                "Ms Carol Doughty (Regional Director Americas, Home Office - UKVI) inaugurated the UK Premium Application Centre in Miami, USA, on 2 November 2016."
            }
          },
          {
            title:
              "Inauguration of the Poland Visa Application Centre in Lutsk, Ukraine",
            image_desc: {
              image_name: "Ukraine.jpg",
              desc:
                "Mr Krzysztof Sawicki (Consul) and Mr Amit Kumar Sharma (Head Of Operations – CIS (Ukraine, Belarus, Kazakhstan and Uzbekistan), VFS Global) inaugurated the Poland Visa Application Centre in Lutsk, Ukraine, on 31 October 2016."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "NewDelhi-India.jpg",
              desc:
                "HE Sir Archil Dzuliashvili  (Georgia Ambassador to India); Mr David Pipinashvili (Deputy Chief of Mission of Georgia to India) visited the Joint Visa Application New Delhi, India, on 20 October 2016."
            }
          },
          {
            title: "Zubin Karkaria honoured with TAAI’s ‘Award of Distinction’",
            image_desc: {
              image_name: "taai_award.jpg",
              desc:
                "Zubin Karkaria, CEO, VFS Global Group, was presented TAAI’s ‘Award of Distinction’ for his long-standing contribution to the Indian travel & tourism industry through VFS Global which has played a strong role in facilitating travel by significantly easing the visa application process. The award also recognises Mr Karkaria’s pioneering and entrepreneurial spirit, and his role as an inspirer and mentor of the industry.  The award was presented to Mr Karkaria on 14 October 2016 at the 63<sup>rd</sup> TAAI Convention held in Abu Dhabi, UAE."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Santiago, Chile",
            image_desc: {
              image_name: "Santiago_Chile.jpg",
              desc:
                "A delegation from the Royal Norwegian Embassy, Chile, including, Mr Henrik Askk, (Consul) and Ms Tina Kyster (Permits Consular Assistant) visited the Joint Visa Application Centre in Santiago, Chile, on 14 October 2016."
            }
          },
          {
            title:
              "Inauguration of the Australia Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "Istanbul_inaugration.jpg",
              desc:
                "HE Mr James Larsen (Ambassador of Australia to Turkey), Mr Steve Rank (Consul-General and Trade Commissioner, Australian Consulate General, Istanbul), and Mr Matthew Morgan (First Secretary (Immigration) / Principal Migration Officer, Department of Immigration and Border Protection (DIBP), Australian Embassy, Ankara) inaugurated the Australia Visa Application Centre in Istanbul, Turkey, on 14 October 2016."
            }
          },
          {
            title:
              "Inauguration of the UK Visa Application Centre in Xi’an, P. R. China",
            image_desc: {
              image_name: "Xian_P_R_China.jpg",
              desc:
                "HE Dame Barbara Woodward (British Ambassador to P. R. China); Mr Shangguan Jiqing (Mayor of Xi’an); Ms Dominique Hardy (UKVI Regional Director- Asia Pacific) and Mr Bernard Vijaykumar (Regional Head – North Asia, VFS Global) inaugurating the UK Visa Application Centre in Xi’an, P. R. China, on 12 October 2016"
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Moscow, Russia",
            image_desc: {
              image_name: "russia.jpg",
              desc:
                "Ms Marije Lamaker (Senior Attache – Consular section (Regional Support Office (Eastern Europe) of the Kingdom of the Netherlands); Mr Ben Suurd  (Consultant, Information Security) and Mr Arthur van Marrewijk (Information Manager) from the Ministry of Foreign Affairs of the Kingdom of the Netherlands; and Mr Harm van Stenis (Head of the Visa Section and First Secretary, Embassy of the Kingdom of the Netherlands in Moscow), visited the Joint Visa Application Centre in Moscow, Russia, on 6 October 2016."
            }
          },
          {
            title:
              "Inauguration of the Joint Visa Application Centre in Doha, Qatar",
            image_desc: {
              image_name: "Qatar.jpg",
              desc:
                "Mr Mario Radic (Consular Officer of the Embassy of the Republic of Croatia); Ms Ester Borrás (DCM and Head - Consular Section of the Embassy of Spain); and Mr Thomas Fischer (Consul, First Secretary of the Embassy of Switzerland) inaugurated the Joint Visa Application Centre in Doha, Qatar, on 6 October 2016."
            }
          },
          {
            title: "Visit to the Joint Visa Application Centre in Singapore",
            image_desc: {
              image_name: "singapore-danish.jpg",
              desc:
                "HE Ms Dorte Bech Vizard (Ambassador of Denmark to Singapore) and Mr Henning Nielsen  (Deputy Head of Mission) from the Royal Danish Embassy, Singapore, visited the Joint Visa Application Centre in Singapore, on 9 September 2016."
            }
          },
          {
            title:
              "Inauguration of the Austria Visa Application Centre in Astana, Kazakhstan",
            image_desc: {
              image_name: "Austria-in-Astana.jpg",
              desc:
                "HE Dr Gerhard Sailler (Ambassador Extraordinary and Plenipotentiary to Kazakhstan, Kyrgyzstan, Tajikistan and Turkmenistan) and Mr Amit Kumar Sharma (Head of Operations – CIS (Ukraine, Belarus, Kazakhstan & Uzbekistan), VFS Global) inaugurating the Austria Visa Application Centre in Astana, Kazakhstan on 1 September 2016."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Pretoria, South Africa",
            image_desc: {
              image_name: "NZ-in-Pretoria-story.jpg",
              desc:
                "Ms Bethany Madden (Charge d’ Affaires of the New Zealand High Commission in Pretoria)(extreme right) ; Mr Craig Pontifex (Operations Manager, Immigration New Zealand); and Mr Hariprasad Viswanathan (Regional Head – South/Central and East Africa, VFS Global )inaugurating the New Zealand Visa Application Centre in Pretoria on 29 August 2016."
            }
          },
          {
            title:
              "Visit to the Austria Visa Application Centre in Abu Dhabi, UAE",
            image_desc: {
              image_name: "austrian-visit.jpg",
              desc:
                "Ms Sandra Mahmoud (Division IV.2 – Travel and Border traffic), Mr Nikolai Herold (Deputy Head of Mission) and Ms Susanne Khan (Consular Affairs) from the Embassy of  Austria in Abu Dhabi, visited the Austria Visa Application Centre in Abu Dhabi, UAE, on 24 August 2016."
            }
          },
          {
            title:
              "Visit to the France Visa Application Centre in Kolkata, India",
            image_desc: {
              image_name: "kolkata-india.jpg",
              desc:
                "HE Mr Alexandre Ziegler (Ambassador of France to India) (centre) and Mr Jean-Marc Fenet (Minister-Counsellor for Economic Affairs) (third from right) from the Embassy of France in New Delhi, accompanied by dignitaries from the Consulate General of France in Kolkata including Mr Damien Syed (Consul General of France in Kolkata) (fourth from right), Mr Olivier Cassin (Deputy Consul) (second from right), and Mr Marc Salesse (Head of the Visa Section) (third from left), visited the France Visa Application Centre in Kolkata, India, on 18 August 2016."
            }
          },
          {
            title:
              "Visit at the Finland Visa Application Centre in Kolkata, India",
            image_desc: {
              image_name: "India.jpg",
              desc:
                "Ms Pirkko Kaikkonen (Head of Immigration Affairs, Embassy of Finland, New Delhi) visited the Finland Visa Application Center in Kolkata, India, on 11 August 2016."
            }
          },
          {
            title:
              "Visit at Canada Visa Application Centre in Beijing, P. R. China",
            image_desc: {
              image_name: "China.jpg",
              desc:
                "Mr John McCallum (Minister of Immigration, Refugees and Citizenship Canada; Mr Robert Orr (Assistant Deputy Minister (Ops) of Immigration, Refugees and Citizenship Canada); Mr Geng Tan (Member of Parliament for Don Valley North); and Ms Roswitha Diehl-MacLean (Deputy Immigration Program Manager) and Ms Nicole Girard (Immigration Program Manager) from the Embassy of Canada in Beijing visiting the Canada Visa Application Centre in Beijing, P. R. China on 8 August 2016."
            }
          },
          {
            title:
              "Visit to the UK, Schengen and India Visa Application Centre in Sydney, Australia",
            image_desc: {
              image_name: "Sydney_Australia.jpg",
              desc:
                "Ms Ming-Chun Wu (Assistant General Manager- Immigration New Zealand) and Ms Brigitte Bialy (Senior Advisor, Commercial Relationships Visa Services- Immigration New Zealand) visited the UK, Schengen and India Visa Application Centre in Sydney, Australia, on 2 August 2016."
            }
          },
          {
            title:
              "Inauguration of the Vignette Management service at the Premium Application Centre in Miami, USA",
            image_desc: {
              image_name: "events-miami.jpg",
              desc:
                "Mr Simon Hayes (International Director, Home Office – UKVI ) affixes the first vignette while inaugurating Vignette Management service at the Premium Application Centre in Miami, USA, on 28 July  2016."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Bogotá, Colombia",
            image_desc: {
              image_name: "Visit_from_UKVI.jpg",
              desc:
                "Delegates from Home Office- UKVI including Mr Simon Hayes (International Director), Ms Kathryn Foster (Regional Manager) and Mr James Bennett (Regional Operations Manager) visited the UK Visa Application Centre in Bogotá, Colombia, on 26 July 2016."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Jakarta",
            image_desc: {
              image_name: "Netherlands-in-Indonesia.jpg",
              desc:
                "HE Mr Patrick Herman (Ambassador of Belgium in Indonesia) (left), HE Mr Rob Swartbol (Ambassador of the Kingdom of the Netherlands in Jakarta) (centre); and Mr Loren D’Souza (Regional Head – South East Asia & Pacific Rim, VFS Global) (right) inaugurating the Netherlands Visa Application Centre in Jakarta"
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Lagos, Nigeria",
            image_desc: {
              image_name: "Belgium_Ambassador.jpg",
              desc:
                "HE Mr Stephane De Loecker (Ambassador of Belgium to Nigeria, Benin, Togo, and Permanent Representative of Belgium to ECOWAS) visited the Joint Visa Application Centre in Lagos, Nigeria, on 22 July 2016."
            }
          },
          {
            title:
              "Inauguration of the Czech Republic Visa Application Centre in Chennai, India",
            image_desc: {
              image_name: "czech-VAC-chennai-india.jpg",
              desc:
                "HE  Mr Milan Hovorka (Ambassador of the Czech Republic to India) inaugurated the  Czech Republic Visa Application Centre in Chennai, India, on 15 July 2016."
            }
          },
          {
            title:
              "Inauguration of Joint Visa Application Centre in Bangkok, Thailand",
            image_desc: {
              image_name: "Event-Bankok-thailand.jpg",
              desc:
                "Ms Margaret Tongue (Deputy Ambassador to the British Embassy in Bangkok) and Ms Octavia Borthwick  (Minister and Deputy Head of Mission of the Austrian Embassy in Bangkok) inaugurating the Joint Visa Application Centre in Bangkok, Thailand, on 11 July 2016"
            }
          },
          {
            title:
              "Inauguration of Turkey Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "India-020716.jpg",
              desc:
                "Mr Erdal Sabri Ergen (Turkish Consul General in Mumbai) inaugurated the Turkey Visa Application Centre in Mumbai, India, on 1 July 2016."
            }
          },
          {
            title:
              "Visit at the France Visa Application Centre in Ahmedabad, India",
            image_desc: {
              image_name: "France-020716.jpg",
              desc:
                "Mr André Ruche (Deputy  Consul, Head of Chancery, from the Consulate General of France in Mumbai) visited the France  Visa Application Centre Ahmedabad, India, on 27 June 2016."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Seoul, Republic of Korea",
            image_desc: {
              image_name: "Korea-090716.jpg",
              desc:
                "Mr Simon Morris (Spoke Liaison Officer –  South Korea, Japan and Taiwan, Home Office - UK Visas and Immigration) visited the UK Visa Application Centre in Seoul, Republic of Korea, on 22 June 2016."
            }
          },
          {
            title:
              "Visit at the Finland Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "Finland-020716.jpg",
              desc:
                "Ms Pirkko Kaikkonen (Head of Immigration Affairs, Embassy of Finland in New Delhi) visited the Finland Visa Application Centre in Mumbai, India, on 15 June 2016."
            }
          },
          {
            title:
              "Inauguration of Joint Visa Application Centre in Thimphu, Bhutan",
            image_desc: {
              image_name: "UK-in-Bhutan.jpg",
              desc:
                "HE Ms Harinder Sidhu (Ambassador of Australia to Bhutan) and Mr Michael Rutland (British Honorary Consul to Bhutan) inaugurated the Joint Visa Application Centre offering visa services to Australia and United Kingdom in Thimphu, Bhutan, on 19 May 2016."
            }
          },
          {
            title:
              "Inauguration of the UK visa application services in Lucknow, India",
            image_desc: {
              image_name: "India-030616.jpg",
              desc:
                "HE Sir Dominic Asquith (British High Commissioner to India); Shri Madhukar Jetley (Member of Legislative Council (UP); Former Advisor NRI Department & Externally Aided Projects Department, Government of Uttar Pradesh, Ranked Minister of State); Mr Nick Crouch (Regional Director - South & Southeast Asia, Home Office - UK Visas & Immigration); and Ms Chhavi Maheshwari (General Manager - UK Operations, South Asia, VFS Global) launched the United Kingdom visa application services in Lucknow, India, on 17 May 2016."
            }
          },
          {
            title:
              "Visit at Sweden Visa Application Centre in Dhaka, Bangladesh",
            image_desc: {
              image_name: "Bangladesh_120516.jpg",
              desc:
                "Mr Morgan Johansson (Honourable Minister of Justice and Migration, Ministry of Justice of Sweden), HE Mr Johan Frisell (Ambassador of Sweden to Bangladesh), and Ms Anneli Peltoniemi Sandkull (Second Secretary - Migration, Embassy of Sweden ) visited the Sweden Visa Application Centre in Dhaka, Bangladesh, on  11 May 2016."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "SP_Visit_120516.jpg",
              desc:
                "Visa Section Chiefs from the Consulate General of Spain in Istanbul including Ms Leonor Álvarez Macías, Ms Praxedes Garcia Vazquez, Ms Inés Iglesias Freire and Mr Alejandro Rafael Ramos visited the Joint Visa Application Centre in Istanbul, Turkey, on 4 May 2016."
            }
          },
          {
            title:
              "Inauguration of Joint Visa Application Centre in Tunis, Tunisia",
            image_desc: {
              image_name: "Tunis-JVAC.jpg",
              desc:
                "HE Mr Carmelo Inguanez (Ambassador of Malta to Tunisia); HE Dr Gerhard Weinberger (Ambassador of Austria to Tunisia); HE Mr Christian Walter Much (Ambassador of the Federal Republic of Germany to Libya); HE Mr Hans van Vloten Dissevelt (Ambassador of the Kingdom Netherlands to Tunisia ); Ms Bibian Zamora (Consul of Spain to Tunisia); Sir Antonio Zavala (Consul of Spain to Libya); Ms Petra Dachtler (Deputy Head of Mission at the Embassy of the Federal Republic of Germany to Tunisia ); Mr Mohan Mathew, (COO – Al Etimad)and Mr Mohamed Slimane (Regional Head – North Africa, VFS Global) inaugurated the Joint Visa Application Centre in Tunis, Tunisia, on 29 April 2016."
            }
          },
          {
            title:
              "Visit at the Netherlands Visa Application Centre Istanbul, Turkey",
            image_desc: {
              image_name: "Netherlands-030516.jpg",
              desc:
                "Ms Marije Lamaker (Coordination Consular Section back office Russia and Turkey, Regional Service Organisation Eastern Europe for Embassy of the Kingdom of the Netherlands) visited the Netherlands Visa Application Centrein Istanbul, Turkey, on 29 April 2016."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Kuala Lumpur, Malaysia",
            image_desc: {
              image_name: "The-Netherlands-in-Malaysia.jpg",
              desc:
                "HE Mr Harry Molenaar (Ambassador of the Netherlands to Malaysia) and Mr Sriram Narayanan (COO – Australasia, VFS Global) inaugurated the Netherlands Visa Application Centre in Kuala Lumpur, Malaysia, on 27 April 2016"
            }
          },
          {
            title:
              "Visit at the Finland Visa Application Centre in Ankara, Turkey",
            image_desc: {
              image_name: "Finland-030516.jpg",

              desc:
                "Ms Paivi Blinnikka (Director – Passport and Visa Unit, the Ministry of Foreign Affairs of Finland) and Ms Liisa Uschanov-Eskelinen (Consul, Embassy of Finland in Ankara) visited the Finland Visa Application  Centre in Ankara, Turkey, on 22 April 2016."
            }
          },
          {
            title:
              "Inauguration of Turkey Visa Application Centre in Hyderabad, India",
            image_desc: {
              image_name: "Turkey-India-210416.jpg",
              desc:
                "Mr Serkin Tasik (Vice Consul, Turkish Consulate in Hyderabad) inaugurated the Turkey Visa Application Centre in Hyderabad, India, on 15 April 2016."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Sylhet, Bangladesh",
            image_desc: {
              image_name: "Sylhet_Bangladesh_140416.jpg",
              desc:
                "Mr Matthew Matsumoto- Prouten M B E (First Secretary, Consular Regional Operations Manager for Bangladesh, Srilanka and the Maldives) from the British High Commission, Dhaka, visited the UK Visa Application Centre in Sylhet, Bangladesh, on 12 April 2016."
            }
          },
          {
            title:
              "Inauguration of Norway Visa Application Centre in Lilongwe, Malawi",
            image_desc: {
              image_name: "Norway-in-Malawi.jpg",
              desc:
                "Mr Bjarne Garden (Deputy Head of Mission, Royal Embassy of Norway in Lilongwe) inaugurated the Norway Visa Application Centre in Lilongwe, Malawi, on 8 April 2016."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Kuwait",
            image_desc: {
              image_name: "Netherlands-in-Kuwait.jpg",
              desc:
                "HE Mr Mr Frans Potuyt (Ambassador to Kingdom of the Netherlands to the State of Kuwait); Ms Jeannette Verkerk  (Attaché (Consular Affairs), Regional Support Office –Middle East); Ms Zumreta Jahic (Head of the Economic section, Embassy of the Netherlands in Kuwait) and Mr Srinarayan Sankaran (COO – Middle East, VFS Global) inaugurated of the Netherlands Visa Application Centre in Kuwait, on 8 April 2016."
            }
          },
          {
            title:
              "Inauguration of Denmark Visa Application Centre in Abidjan, Republic of Côte d'Ivoire",
            image_desc: {
              image_name:
                "Inauguration_of_Denmark_Visa_Application_Centre_in_Abidjan.jpg",
              desc:
                "Mr Jacob Kahl Jepsen (Commercial Attaché, Embassy of Denmark, Accra) and Ms Elise Akoissi Koffi (Assistant to the Honorary Consul of Denmark in Abidjan) inaugurated the Denmark Visa Application Centre in Abidjan, Republic of Côte d'Ivoire, on 7 April 2016."
            }
          },
          {
            title:
              "Inauguration of Cyprus Visa Application Centre in Abu Dhabi, UAE",
            image_desc: {
              image_name: "Cyprus_Inaguration_Abu_Dhabi_UAE_230416.jpg",
              desc:
                "HE Mr Vasilis Polemitis (Ambassador of the Republic of Cyprus to the United Arab Emirates) inaugurated the Cyprus Visa Application Centre in Abu Dhabi, UAE, on 6 April 2016."
            }
          },
          {
            title:
              "Inauguration of Estonia Visa Application Centre in Minsk, Belarus",
            image_desc: {
              image_name:
                "Inauguration_of_Estonia_Visa_Application_Centre_in_Minsk_Belarus.jpg",
              desc:
                "HE Mr Mait Martinson (Ambassador Extraordinary and Plenipotentiary of the Republic of Estonia to the Republic of Belarus) and Mr Prabuddha Sen (Regional Head – Russia & CIS, VFS Global) inaugurated the Estonia Visa Application Centre in Minsk, Belarus, on 4 April 2016."
            }
          },
          {
            title:
              "Visit at the Slovenia Visa Application Centre in Ankara, Turkey",
            image_desc: {
              image_name:
                "Slovenia_Visit_Head_of_Visa_Section_Anton_Pirih_and_Tatjana_Ikic_Embassy_120416.jpg",
              desc:
                "Mr Anton Pirih (Head of Visa Division, Republic of Slovenia Ministry of Foreign Affairs) and Ms Tatjana Ikic (Attaché, Embassy of the Republic of Slovenia in Ankara) visited the Slovenia Visa Application Centre in Ankara, Turkey, on 4 April 2016."
            }
          },
          {
            title:
              "Visit at the France Visa Application Centre in Kyiv, Ukraine",
            image_desc: {
              image_name: "Kyiv_120416.jpg",
              desc:
                "HE Ms Isabelle Dumont (Ambassador of France in Ukraine) together with Ms Marie-Hélène Teylouni, (Consul of France in Ukraine) visited France Visa Application Centre in Kyiv, Ukraine, on 31 March 2016."
            }
          },
          {
            title:
              "Visit at the Thailand Visa Application Centre in Dhaka, Bangladesh",
            image_desc: {
              image_name: "bangladesh_300316.jpg",
              desc:
                "Delegates from the Visa and travel documents division of the Ministry of Foreign Affairs of the Kingdom of Thailand, including Mr Mungkorn Pratoomkaew (Director), Ms Phanchita Rommayanont (First Secretary) and Ms Wirattinee Vatanyootaweewat (Attaché) accompanied by representatives from the Royal Thai Embassy including Mr Phasit Chudabuddhi (Chargé d’ Affaires a.i.) and Ms Chompunut Phasuphan (Second Secretary) visited the Thailand Visa Application Centre in Dhaka, Bangladesh, on 22 March 2016."
            }
          },
          {
            title:
              "Visit at the Poland Visa Application Centre in Minsk, Belarus",
            image_desc: {
              image_name: "belarus_290316.jpg",
              desc:
                "MrWitold Waszczykowski (Honourable Minister of Foreign Affairs of the Republic of Poland); HE Mr Konrad Pawlik (Ambassador of the Republic of Poland to the Republic of Belarus); and Mr Marek Pędzich (Consul General of the Republic of Poland in Minsk) visited the Poland Visa Application Centre in Minsk, Belarus, on 22 March 2016."
            }
          },
          {
            title:
              "Inauguration of Spain Visa Application Centre in Moscow, Russia",
            image_desc: {
              image_name: "Moscow_Russia_140416.jpg",
              desc:
                "Mr Miguel Bauzá More (Consul General of Spain in Moscow) and Mr Prabuddha Sen (Regional Head – Russia and CIS, VFS Global) inaugurated the Spain Visa Application Centre in Moscow, Russia, on 17 March 2016."
            }
          },
          {
            title:
              "Inauguration of Hungary Visa Application Centre in Manama, Bahrain",
            image_desc: {
              image_name: "Manama-Bahrain-210416.jpg",
              desc:
                "HE Mr Fernec Csillag (Ambassador of Hungary to Kingdom of Saudi Arabia, Kingdom of Bahrain & the Sultanate of Oman) and Dr Dhafer Ahmed Alumran (Assistant Undersecretary for GCC and Western Countries, Ministry of Foreign Affairs of the Kingdom of Bahrain) inaugurated the Hungary Visa Application Centre in Manama, Bahrain, on 16 March 2016."
            }
          },
          {
            title:
              "Visit at the Thailand Visa Application Centre in Dhaka, Bangladesh",
            image_desc: {
              image_name: "dhaka_290316.jpg",
              desc:
                "Mr Phasit Chudabuddhi (Charge d' Affaires a.i). & Ms Chompunut Phasuphan (Second Secretary) from the Royal Thai Embassy in Dhaka visited the Thailand Visa Application Centre in Dhaka, Bangladesh on 15 March 2016."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Kyiv, Ukraine",
            image_desc: {
              image_name: "ukraine_220316.jpg",
              desc:
                "Mr Andrius Pulokas (Director, Consular Department), Mr Dainius Sriubsa (Head of Schengen Division), and Mr Mindaugas Vyskupaitis (Second Secretary, Schengen division) from the Ministry of Foreign Affairs of Lithuania, and representatives from the Consular sections from Belarus, Moldova and Ukraine visited Joint Visa Application Centre in Kyiv, Ukraine, on 17 March 2016."
            }
          },
          {
            title:
              "Visit at the New Zealand Visa Application Centre in Shanghai, P. R. China",
            image_desc: {
              image_name:
                "Visit_at_the_New_Zealand_Visa_Application_Centre_in_Shanghai_P_R_China.jpg",
              desc:
                "Mr David Smol (Chief Executive of the Ministry of Business, Innovation and Employment, Government of New Zealand) accompanied by Mr Jock Gilray (Consul (Immigration), New Zealand Consulate General in Shanghai) visited the New Zealand Visa Application Centre in Shanghai, P.R China, on 10 March 2016."
            }
          },
          {
            title:
              "Visit at the South Africa Visa Application Centre in Abuja, Nigeria",
            image_desc: {
              image_name: "Nigeria_110316.jpg",
              desc:
                "Mr Malusi Gigaba (Honourable Minister of Home Affairs of South Africa) visited the South Africa Visa Application Centre in Abuja, Nigeria, on 7 March 2016."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Colombo, Sri Lanka",
            image_desc: {
              image_name: "SriLanka_190316.jpg",
              desc:
                "HE Mr James Dauris (British High Commissioner for Sri Lanka & Maldives) accompanied by Mr Edward Megarry (Second Secretary-Migration, Immigration Liaison Manager) visited the UK Visa Application Center in Colombo on 4 March 2016."
            }
          },
          {
            title:
              "Inauguration of the France Visa Application Centre in Abidjan, Republic of Côte d'Ivoire",
            image_desc: {
              image_name: "Abidjan_110316.jpg",
              desc:
                "Mr Abdallah Albert Toikeose Mabri (Honourable Minister of Foreign Affairs of the Republic of Côte d'Ivoire), HE Mr George Serre (Ambassador of France in the Republic of Côte d'Ivoire) and Mr Philippe Truquet (Consul General of France in the Republic of Côte d'Ivoire) at the inauguration of the France Visa Application Centre in Abidjan, Republic of Côte d'Ivoire, on 1 March 2016."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "BPW_030316.jpg",
              desc:
                "Mr Jose del Palacio Tamarit (Consul from the Embassy of Spain) visited the Joint Visa Application Centre in New Delhi, India on 29 February 2016."
            }
          },
          {
            title:
              "Visit at the UK and Ireland Visa Application Centre, New Delhi, India",
            image_desc: {
              image_name: "Ukireland_260216.jpg",
              desc:
                "Rt Hon Mr James Brokenshire MP (Minister for Immigration, United Kingdom), addressed the media and travel fraternity at the UK and Ireland Visa Application Centre in New Delhi, India, on 16 February 2016. He was accompanied by HE Dr Alexander Evans (Acting High Commissioner of United Kingdom to India); Mr Nick Crouch (Regional Director South & Southeast Asia, Home Office – UKVI); and Ms Natasha Woollcombe (Regional Communications Manager South and Southeast Asia Home Office – UKVI)"
            }
          },
          {
            title:
              "Visit at the Italy Visa Application Centre in Dhaka, Bangladesh",
            image_desc: {
              image_name: "Dhaka_260216.jpg",
              desc:
                "Mr Gabriele Luca Fava (Counsellor – Visa Centre, Direction General for Italians Abroad and Migration Policies, Ministry of Foreign Affairs of Italy) and Ms Patrizia Cacciatory (Head of visa section, Embassy of Italy, Bangladesh) visited the Italy Visa Application Centre in Dhaka, Bangladesh on 15 February 2016"
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Ankara, Turkey",
            image_desc: {
              image_name: "Ankara_260216.jpg",
              desc:
                "Ms Maria Opelova (Minister- Counsellor, Head of the Consular Section, Embassy of the Czech Republic in Ankara) visited the Joint Visa Application Centre in Ankara, Turkey on 15 February 2016"
            }
          },
          {
            title:
              "Inauguration of the UK Visa Application Centre in Hyderabad, India",
            image_desc: {
              image_name: "DSC_180216.jpg",
              desc:
                "Mr Andrew McAllister (British Deputy High commissioner) inaugurated the UK Visa Application Centre in Hyderabad, India on 16 February 2016."
            }
          },
          {
            title:
              "Visit at the Netherlands Visa Application Centre in Kuala Lumpur, Malaysia",
            image_desc: {
              image_name: "Group_Photo_Netherlands_090216.jpg",
              desc:
                "Ms Joyce Nijjsen (First Secretary/ Deputy Head) and Mr Peter Verheijen (Senior Consular Officer) from the Regional Support Office (Asia) of the Kingdom of the Netherlands along with representatives from the Embassy of the Kingdom of the Netherlands including Mr Ton Mandemaker (Deputy Head of Mission) and Ms Carol Peters (Senior Officer Administrative and Consular & Affairs) visited the Netherlands Visa Application Centre in Kuala Lumpur on 5 February 2016."
            }
          },
          {
            title:
              "Inauguration of the Hungary Visa Application Centre in Kuwait",
            image_desc: {
              image_name: "Hungary_in_Kuwait_260216.jpg",
              desc:
                "HE Mr Mihály Bayer (Ambassador of Hungary to the State of Kuwait); Mr László Szabó (Deputy Minister of Foreign Affairs); HE Dr Hamad Burhamah (Ambassador of the State of Kuwait t0 Hungary) and Mr Khalifa M Hamada (Undersecretary of the Ministry of Finance of Kuwait) inaugurated the Hungary Visa Application Centre in Kuwait, on 29 January 2016"
            }
          },
          {
            title:
              "Visit at the Joint visa Application Centre in Harbiye, Turkey",
            image_desc: {
              image_name: "Finland_Visit_090216.jpg",
              desc:
                "Mr Jeff Hakko (Honorary Consul General of Finland in Istanbul) visited the Joint Visa Application Centre in Harbiye, Turkey on 28 January 2016."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "Instanbul_090216.jpg",
              desc:
                "Ms Hege Østerud (Senior Advisor, Ministry of Foreign Affairs of Norway) and Ms Veslemøy Talgø (Attaché (Immigration), Norwegian Embassy in Ankara) visited the Joint Visa Application Centre in Istanbul, Turkey on 27 January 2016."
            }
          },
          {
            title:
              "Inauguration of the Premium Application Centre for UK visa applicants in New York, USA",
            image_desc: {
              image_name: "NYUS_260216.jpg",
              desc:
                "Ms Carol Doughty (Regional Director Americas, Home Office - UKVI) and Mr Chris Dix (COO – Europe & Americas) inaugurated the Premium Application Centre in New York, USA on 21 January 2016."
            }
          },
          {
            title:
              "Inauguration of the France Visa Application Centre in Abuja, Nigeria",
            image_desc: {
              image_name: "France_260216.jpg",
              desc:
                "HE Mr Denys Gauer (Ambassador of France in Abuja, Nigeria) inaugurated the France Visa Application Centre in Abuja, Nigeria, on 21 January 2016."
            }
          },
          {
            title:
              "Launch of the Platinum Lounge and On Demand Mobile Biometrics services at the Joint Visa Application Centre in Dubai, UAE",
            image_desc: {
              image_name: "Platinum_Lounge_260216.jpg",
              desc:
                "HE Mr Rashid Mattar Al Siri Al Qamzi (Deputy Director of the Ministry of Foreign Affairs, Dubai); Mr Paul Fox (HM Consul General, British Embassy, Dubai); and Mr Srinarayan Sankaran (COO – Middle East, VFS Global) inaugurated the Platinum Lounge as well as the On Demand Mobile Biometrics services in Dubai, UAE, on 20 January 2016, for UK visa applicants."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "Joint_visa_Application_Delhi_090216.jpg",
              desc:
                "Ms Laura Paletta Crespo (Secretary- Chief of Consular Section) from the Embassy of Brazil, New Delhi, visited the Joint Visa Application Centre in New Delhi, India on 20 January 2016."
            }
          },
          {
            title:
              "Inauguration of Temporary Visa Application Centre for UK visa applicants in Surabaya, Indonesia",
            image_desc: {
              image_name: "TEL_in_Surabaya_260216.jpg",
              desc:
                "HE Mr Moazzam Malik (British Ambassador to Indonesia) and Mr Nurwiyatno (Interim Mayor of Surabaya) inaugurated the Temporary Visa Application Centre in Surabaya, Indonesia on 1 4 January 2016."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "New_delhi_080116.jpg",
              desc:
                "French Senator, Mr M Olivier Cadic accompanied by Mr Siva Predibane (Consular-Assembly for the French Citizen Abroad), and delegates from the Embassy of France, including Mr M Thierry Morkel (Second Secretary) and Ms Francoise Gruson (Chief of Visa Section) visited the Joint Visa Application Centre, in New Delhi, India on 5 January 2016."
            }
          },
          {
            title:
              "Visit at the Australia Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "Australia_VAC_visit_090216.jpg",
              desc:
                "Mr Liang Zeng (Consul of Australia in Mumbai) and Mr James Goodsell (Counsellor (Immigration), Australian High Commission, New Delhi) visited the Australia Visa Application Centre in Mumbai, India on 17 December 2015."
            }
          },
          {
            title:
              "Immigration New Zealand renews visa services contract, three new countries signed",
            image_desc: {
              image_name: "NewZealand_Immigration_Logo_250116.jpg",
              desc:
                "VFS Global is privileged to have renewed its contract for visa services with client government New Zealand. Along with contract renewal for the company’s services in 9 countries, globally, services are also to be expanded into three additional countries.  The contract was signed by Mr David Smol (Chief Executive, Ministry of Business, Innovation, and Employment) and Mr Sriram Narayan (COO – Australasia, VFS Global) on 16 December 2015."
            }
          },
          {
            title:
              "Inauguration of the Czech Republic Visa Application Centre in Pretoria, South Africa",
            image_desc: {
              image_name: "Czech_in_Pretoria_260216.jpg",
              desc:
                "HE Dr Michal Král (Ambassador  of the Czech Republic in South Africa) along with Mr Jiten Vyas (COO – Africa, VFS Global) inaugurated the Czech Republic Visa Application Centre in Pretoria, South Africa, on 7 December 2015."
            }
          },
          {
            title: "Visit at the UK Visa Application Centre in Abu Dhabi",
            image_desc: {
              image_name: "Abu_dhabi_121215.jpg",
              desc:
                "A delegation from the Home Office –UKVI including Mr Gareth Elks (Regional Manager – Middle East, and Mr Jon Drew and Mr Lee Edwards (Customer team)visited the UK Visa Application Centre in Abu Dhabi, Dubai on 7 December 2015."
            }
          },
          {
            title:
              "Inauguration of the Joint Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "india_031215.jpg",
              desc:
                "Dr Mahesh Sharma (Honourable Union Minister of Tourism and Culture, Government of India) along with senior dignitaries from different client governments, and Mr Vinay Malhotra (COO – South Asia and DVPC) from VFS Global, inaugurated the Joint Visa Application Centre in New Delhi, India on 2 December 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Abu Dhabi, UAE",
            image_desc: {
              image_name: "UAE_021215.jpg",
              desc:
                "Sophie Boucher (Head of Visa Section) from the French Embassy in Abu Dhabi visited the Joint Visa Application Centre in Abu Dhabi, UAE on 26 November 2015."
            }
          },
          {
            title:
              "Visit at the Schegen Visa Application Centre in Kyiv, Ukraine",
            image_desc: {
              image_name: "ukraine_011215.jpg",
              desc:
                "Mr Aivar Tsarski (Consulate General in Kyiv); Mr Avo Roots (Estonian Police and Border Guard Board); Mr Lauri Hein (Border Guard Officer); and Mr Jaanus Breivel (Liason Officer of Migration in Kyiv ) visited Schengen Visa Application Centre in Kyiv, Ukraine on 20 November 2015."
            }
          },
          {
            title:
              "Inauguration of the Ireland and UK Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "new_delhi_271115.jpg",
              desc:
                "Sir James Bevan (British High Commissioner to India); Mr Gerry Kelly (Chargé d´Affaires, Embassy of Ireland); and Vinay Malhotra ( Chief Operating Officer – South Asia & DVPC, VFS Global) inaugurating the Ireland and UK Visa Application Centre in New Delhi, India on 18 November 2015."
            }
          },
          {
            title:
              "Inauguration of Canada and New Zealand Visa Application Centres in Hong Kong",
            image_desc: {
              image_name: "hongkong_251115.jpg",
              desc:
                "Ms Gabrielle Rush (Consul General of New Zealand in Hong Kong), Mr Ian Burchett (Consul General of Canada in Hong Kong) and Mr Bernard Vijaykumar (Regional Head – North Asia, VFS Global) inaugurating the Canada and New Zealand Visa Application Centre in Hong Kong on 17 November 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Harbiye, Turkey",
            image_desc: {
              image_name: "Hearbiye_251115.jpg",
              desc:
                "Mr Angel Angelov (Consul General of Bulgaria in Istanbul) (second from left) visited the Joint Visa Application in Harbiye, Turkey on 17 November 2015."
            }
          },
          {
            title:
              "Visit at the Lithuania Visa Application Centre in Kyiv, Ukraine",
            image_desc: {
              image_name: "kyiv_241115.jpg",
              desc:
                "Mr  Antanas Satas (Head of Visa Section in Kyiv), Mr Renatas Požėla (General) and  Mr Antanas Sermontis (Major) from the State Border Guard Service, Lithuania,  visited Schengen Visa Application Centre in Kyiv, Ukraine on 13 November 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Harbiye, Turkey",
            image_desc: {
              image_name: "Harbive_VAC_241115.jpg",
              desc:
                "Delegates  from the Danish Agency for International Recruitment and Integration including  Ms Annetorte Pederson (Head of Work Division) and Ms Nanna Rytter Larsen (Head  of Student Division) visited the Joint Visa Application Centre in Harbiye,  Turkey on 12 November 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "istanbul_241115.jpg",
              desc:
                "Dr Nora Jurkovičová (Consul General of the Czech Republic, Head of Visa and Consular Section)  the visited the Joint Visa Application Centre in Istanbul, Turkey on 11 November 2015."
            }
          },
          {
            title:
              "Visit at the Canada Visa Application Centre in Ankara, Turkey",
            image_desc: {
              image_name: "Harbiye_Vac_241115.jpg",
              desc:
                "Ms  Carolyn Wallace (First Secretary, Immigration, Embassy of Canada, Ankara) and  Ms Monica Moritz – CBSA Liaison Officer visited the Canada Visa Application  Centre in Ankara, Turkey, on 10 November 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Nairobi, Kenya",
            image_desc: {
              image_name: "Nairobi_241115.jpg",
              desc:
                "Representatives from VFS Global’s Schengen client governments including Mr Franco Massimo (Head Visa Section, Embassy of Italy), Ms Anne Christina Östman (Consular Officer, Embassy of Denmark), Ms Ksenia Baranóva Sheykina (Visa Section Officer, Embassy of Spain), Ms Barbro Ekvall, (First Secretary, Head of Migration/Visa Section, Embassy of Sweden) and Mr Ben Leeds (Visa & Immigration, Royal Norwegian Embassy) visited the Joint Visa Application Centre in Nairobi, Kenya on 6 November 2015."
            }
          },
          {
            title:
              "Inauguration of the Czech Republic Visa Application Centre in Abu Dhabi, UAE",
            image_desc: {
              image_name: "Abu_Dhabi_021215.jpg",
              desc:
                "HE Alexandr Sporys (Ambassador of the Czech Republic to the United Arab Emirates); Mr Eduard Muricky (Deputy Minister of the Ministry of Trade and Industry of the Czech Republic) and Mr Ajit Alexander  (Former Regional CEO – Middle East & Africa, VFS Global) inaugurating the Czech Republic Visa Application Centre in Abu Dhabi, UAE on 4 November 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Izmir, Turkey",
            image_desc: {
              image_name: "Turkey_071115.jpg",
              desc:
                "Ms Zeliha Toprak (Consul of France in Izmir) visited the Joint Visa Application Centre in Izmir, Turkey, on 4 November 2015"
            }
          },
          {
            title:
              "Visit at the Malta Visa Application Centre in Izmir, Turkey",
            image_desc: {
              image_name: "Turkey_271015.jpg",
              desc:
                "Mr Franklin Aquilina (Consul General for Malta in Istanbul) and Dr Ahmet Calik (Honorary Consul for Malta in Izmir) visited the Malta Visa Application Centre in Izmir, Turkey on 23 October 2015."
            }
          },
          {
            title:
              "Opening of the China Visa Application Centre in Nairobi, Kenya",
            image_desc: {
              image_name: "Kenya_271015.jpg",
              desc:
                "Delegates from Qian Dai Fu (QDF) including Mr Dai Yining, Mr Sun Hao, Ms Li Li and Mr Wang Wei during the opening of the China Visa Application Centre in Nairobi, Kenya on 15 October 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "Istanbul_271015.jpg",
              desc:
                "Mr Nicolay Panayotov  (Second Secretary, Consular and Legal Affairs - EU and Schengen Unit, Consular Relations Department, Ministry of Foreign Affairs of the Republic of Bulgaria), Ms Neli Simeonova (Head of Consular Section, Consulate General of the Republic of Bulgaria in Istanbul) and Mr Jordan Ivanov (Third Secretary, Consulate General of the Republic of Bulgaria in Istanbul) visited the Joint Visa Application Centre in Istanbul, Turkey on 13 October 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Ankara, Turkey",
            image_desc: {
              image_name: "Ankara_071115.jpg",
              desc:
                "Delegates from the European Union Commision including Mr Guido Schwarz, Ms Hana Flanderová, MrRon Bronsteijn, Mr Frans Koning and Mr Anton Pirih visited the Joint Visa Application Centre in Ankara, Turkey on 12 October 2015."
            }
          },
          {
            title:
              "Visit at the Czech Republic Visa Application Centre in Harbiye, Turkey",
            image_desc: {
              image_name: "Harbiye_271015.jpg",
              desc:
                "Ms Nora Jurkovičová (Consul, Head of Visa and Consular Section) from the Consulate General of the Czech Republic in Istanbul visited the Czech Republic Visa Application Centre in Harbiye, Turkey on 29 September 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Dhaka, Bangladesh",
            image_desc: {
              image_name: "Bangladesh_021015.jpg",
              desc:
                "HE Mr Ioannis E Raptakis (Ambassador of Greece in Bangladesh, India, the Maldives, Nepal and Sri Lanka) visited the Joint Visa Application Centre in Dhaka, Bangladesh on 29 September 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "Istanbul2_271015.jpg",
              desc:
                "Mr Piotr Drzewiecki - Head of Visa Section (New) Mr Witold Lesniak (Head of Visa Section (outgoing))and Mr  Wiktor Wnukowski (Vice Consul ) from the Consulate General of the Republic of Poland visited the Joint Visa Applcation Centre in Istanbul, Turkey on 28 September 2015."
            }
          },
          {
            title:
              "Inauguration of Greece and Lithuania Visa Application Centres in Yerevan, Armenia",
            image_desc: {
              image_name: "Armenia_011015.jpg",
              desc:
                "HE Mr Erikas Petrikas (Ambassador of the Republic of Lithuania to the Republic of Armenia), HE Mr Ioannis Taghis (Ambassador of the Hellenic Republic to the Republic of Armenia), Ms Jūratė Raguckienė (Chancellor of the Ministry of Foreign Affairs of the Republic of Lithuania) and Mr Prabuddha Sen (Regional Head – Russia and CIS, VFS Global) in Yerevan, Armenia on 24 September."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Lagos, Nigeria",
            image_desc: {
              image_name: "Nigeria_121215.jpg",
              desc:
                "Mr Laurent Polonceaux (Consul General of France in Lagos, Nigeria) and Ms Marie-Chantal Dumont (Deputy Consul, Visa Section Head) from the Consulate General of France visited the Joint Visa Application Centre in Lagos, Nigeria on the 18 September 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "Istanbul3_271015.jpg",
              desc:
                "Dignitaries from the Conulate General of France in Istanbul including Ms Isabelle Menut (Deputy Consul – Head of Visa Section), Aurelien Maıllet (Deputy Consul General), and Mr Abdeslam Kannibou (Vice Consul, Visa Section), visited the Joint Visa Application Centre in Istanbul, Turkey on 17 September 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "Mumbai_170915.jpg",
              desc:
                "Dignitaries from the Consulate General of Belgium in Mumbai including Mr Peter Huyghebaert (Consul General); Mr Bernard Jacxsens, Consul (Consular and Administrative Affairs) and Ms Pascale Smeyers (Vice-Consul), visited the Joint Visa Application Centre in Mumbai, India on 14 September 2015."
            }
          },
          {
            title:
              "Inauguration of the Czech Republic Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "Delhi_170915.jpg",
              desc:
                "HE Mr Milan Hovorka, Ambassador of the Czech Republic in India, accompanied by Mr Roman Masařík (Head of mission, Chargé d'affaires a.i. of the Czech Republic) and Ms Monika Dobiášová (Head of Consular Section, Second Secretary) from the Embassy of the Czech Republic in New Delhi and Mr Vinay Malhotra (COO – South Asia and DVPC, VFS Global) inaugurating the Czech Republic Visa Application Centre in New Delhi India on 11 September 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "Istanbul4_271015.jpg",
              desc:
                "Ms Anna-Liisa Pozantı (Honorary Consul General of Finland in Istanbul) and Ms Liisa Uschanov-Eskelinen (Consul, Embassy of Finland in Ankara) visited the Joint Visa Application Centre in Istanbul, Turkey, on 10 September 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Kolkata, India",
            image_desc: {
              image_name: "Kolkata.jpg",
              desc:
                "Mr Damien Syed (Consul General of France in Kolkata) and Mr Marc Salesse (Head of Visa Section, Consulate General of France in Kolkata) visited the Joint Visa Application Centre in Kolkata, India on 9 September 2015."
            }
          },
          {
            title:
              "Inauguration of Vietnam Visa Application Centre in Bengaluru, India",
            image_desc: {
              image_name: "Bengaluru_230915.jpg",
              desc:
                "Mr Tran Quang Tuyen (Minister – Deputy Chief of Mission, Embassy of the Socialist Republic of Vietnam to India) inaugurating Vietnam Visa Application Centre in Bengaluru, India on 7 September 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Bengaluru, India",
            image_desc: {
              image_name: "Bengaluru_070915.jpg",
              desc:
                "Mr François Gautier (Consul General of France in India) visited the Joint Visa Application Centre in Bengaluru, India on 3 September 2015."
            }
          },
          {
            title: "Inauguration of Joint Visa Application Centre in Shanghai",
            image_desc: {
              image_name: "Shanghai_011015.jpg",
              desc:
                "Mr Zubin Karkaria (CEO),  Mr Bernard Martyris (CHRO) and Mr Bernard Vijaykumar (Regional Head – North Asia) from VFS Global; and Mr Peiheng Zhou (VFS Global Shanghai Partner) inaugurating the Joint Visa Application Centre in Shanghai on 26 August 2015."
            }
          },
          {
            title:
              "Head of Department of Services for Foreign Ministry Home and Overseas Offices of the P. R. China meets VFS Global’s CEO",
            image_desc: {
              image_name: "Foreign_Ministry_china_011015.jpg",
              desc:
                "Mr Qu Laipu (Director-General of Department of Services for Foreign Ministry Home and Overseas Offices of the People’s Republic of China) met Mr Zubin Karkaria (CEO, VFS Global) on 25 August 2015, at The Olive Hall in the Ministry of Foreign Affairs, Beijing, China, to discuss business development and future cooperation."
            }
          },
          {
            title:
              "Head of Department of Services for Foreign Ministry Home and Overseas Offices of the People’s Republic of China meets VFS Global’s CEO",
            image_desc: {
              image_name: "Foreign_Ministry_011015.jpg",
              desc:
                "Mr Qu Laipu (Director-General of Department of Services for Foreign Ministry Home and Overseas Offices of the People’s Republic of China) met Mr Zubin Karkaria (CEO, VFS Global) on 25 August 2015, at The Olive Hall in the Ministry of Foreign Affairs, Beijing, China, to discuss business development and future cooperation."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "Istanbul5_271015.jpg",
              desc:
                "Mr Henk Gebuis (Visa Consul), Ms Lidy Westerhof (Head of Internal and Consular Affairs) and Ms Monique Regeer (Cosular Affairs) from the Consulate General of the Netherlands visited the Joint Visa Application Centre in Istanbul, Turkey on 20 August 2015."
            }
          },
          {
            title:
              "Visit at Schengen Visa Application Centre in Colombo, Sri Lanka",
            image_desc: {
              image_name: "Sri_Lanka_030915.jpg",
              desc:
                "HE Mr Ioannis E Raptakis (Ambassador of Greece in Bangladesh, India, Maldives, Nepal and Sri Lanka) visited the Schengen Visa Application Centre in Colombo, Sri Lanka on 19 August 2015."
            }
          },
          {
            title:
              "Inauguration of Joint Visa Application Centre in Chennai, India",
            image_desc: {
              image_name: "India_030915.jpg",
              desc:
                "HE Mr Ioannis E Raptakis (Ambassador of Greece in Bangladesh, India, Maldives, Nepal and Sri Lanka), Mr Bart Degroof (Consul General of Belgium in Chennai), Mr Achim Fabig (Consul General of the Federal Republic of Germany in Chennai), Ms Helene Charoin (Deputy Consul General of France in Puducherry) and Mr Vinay Malhotra (COO – South Asia & DVPC, VFS Global)  inaugurating the Joint Visa Application Centre in Chennai, India on 18 August 2015."
            }
          },
          {
            title: "Visit at UK Visa Application Centre in Abu Dhabi, UAE",
            image_desc: {
              image_name: "Abu_Dhabi_080815.jpg",
              desc:
                "Ms Sarah Rapson (Director General) & Mr Gareth Elks (Regional Manager) from Home Office-UKVI visited the UK Visa Application Centre in Abu Dhabi, UAE on 3 August 2015. The guests were received by  Mr Zubin Karkaria (CEO) and Mr Ajit Alexander  (COO – Middle East and Africa) from VFS Global."
            }
          },
          {
            title:
              "Inauguration of South Africa Visa Application Centre in London, UK",
            image_desc: {
              image_name: "South_Africa_050815.jpg",
              desc:
                "Mr Malusi Gigaba (Minister of Home Affairs of South Africa) along with Mr Obed Mlaba (South African High Commissioner to the UK) inaugurating the South Africa Visa Application Centre in London, UK on 31 July 2015."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Beijing, P. R. China",
            image_desc: {
              image_name: "China_060815.jpg",
              desc:
                "Mr Martin Roper (Minister and Deputy Head of Mission at British Embassy, Beijing), the Rt Hon Oliver Letwin MP (The Chancellor of the Duchy of Lancaster) and Ms Dominique Hardy (‎Home Office Regional Director - Asia Pacific) visited the UK Visa Application Centre in Beijing, P. R. China on 30 July 2015."
            }
          },
          {
            title: "Visit at Joint Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "1_280715.jpg",
              desc:
                "Mr Anton Schwab (Consul & Second Secretary (Future Head of Visa Section) who was accompanied by Ms Valerie Miles Fridez (Vice-Consul), Mr Daniel Berset (Attaché) and Ms Gabriela Wuethrich (Consular Trainee) from the Embassy of Switzerland in India, visited the Joint Visa Application Centre in New Delhi, India on 23 July 2015."
            }
          },
          {
            title:
              "Inauguration of Cyprus Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "India_220715.jpg",
              desc:
                "Mr Demetrios Theophylactou (High Commissioner of the Republic of Cyprus to India), Mr Michalis Hadjikyrou (Charge d'affairs, High Commission of the Republic of Cyprus ) and Mr Vinay Malhotra (COO – South Asia and DVPC, VFS Global) inaugurating the Cyprus Visa Application Centre in New Delhi, India on 21 July 2015."
            }
          },
          {
            title:
              "Inauguration of Spain Visa Application Centre in Accra, Ghana",
            image_desc: {
              image_name: "Ghana_100715.jpg",
              desc:
                "Mr Rodrigo Reyero Pita (Charge d'Affaires a.i., The Embassy of Spain in Accra) inaugurating the Spain Visa Application Centre in Accra, Ghana on 7 July 2015."
            }
          },
          {
            title:
              "Inauguration of Russia Visa Application Centre in Singapore",
            image_desc: {
              image_name: "singapore_100715.jpg",
              desc:
                "HE Mr Andrey Tatarinov (Ambassador of Russia to Singapore) and Mr Loren D’Souza (Regional Head – Southeast Asia & Pacific Rim, VFS Global) inaugurating the Russia Visa Application Centre in Singapore on 3 July 2015."
            }
          },
          {
            title:
              "Inauguration of Norway Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "New_Delhi_040715.jpg",
              desc:
                "Ms Kjerstin Haugen (Counsellor, Royal Norwegian Embassy in New Delhi) and Mr Vinay Malhotra (COO – South Asia and DVPC, VFS Global) inaugurating the Norway Visa Application Centre in New Delhi, India on 2 July 2015."
            }
          },
          {
            title:
              "Inauguration of Estonia Visa Application Centre in Kyiv, Ukraine",
            image_desc: {
              image_name: "Ukraine_010815.jpg",
              desc:
                "HE Mr Sulev Kannike  (Ambassador of Embassy of Estonia in Ukraine) accompanied by Mr Aivar Tsarski  (Director of the Consular Section) from the Estonian Embassy in Kyiv, and Mr Prabuddha Sen (Regional Head – Russia & CIS) from VFS Global, inaugurating the Estonia Visa Application Centre in Kyiv, Ukraine on 25 June 2015."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Guangzhou, P. R. China",
            image_desc: {
              image_name: "Guangzhou_270615.jpg",
              desc:
                "Mr Matthew Rous (British Consul General in Guangzhou) along with dignitaries from the Consulate General of Belgium in Guangzhou including Mr Christian de Lannoy (Consul General) and Mr Mark Neel (Consul) visited the UK Visa Application Centre in Guangzhou, P. R. China on 19 June 2015."
            }
          },
          {
            title:
              "Inauguration of Canada Visa Application Centre in Abuja, Nigeria",
            image_desc: {
              image_name: "Abuja_Nigeria_030715.jpg",
              desc:
                "Mr Perry John Calderwood (High Commissioner of Canada in the Federal Republic of Nigeria) inaugurating the Canada Visa Application Centre in Abuja, Nigeria on 16 June 2015."
            }
          },
          {
            title:
              "Visit at the Canada Visa Application Centre in Shanghai, P. R. China",
            image_desc: {
              image_name: "shanghai_270615.jpg",
              desc:
                "Ms Dawn Edlund (Associate Assistant Deputy Minister, Operations, Department of Citizenship and Immigration), Ms Michelle P Mann (Senior Counsel, Legal Services, Citizenship and Immigration Canada) and Mr Allan Frankenberger (Consul and Immigration Program Manager from the Consulate General of Canada in Shanghai) visited the Canada Visa Application Centre in Shanghai, P. R. China on 16 June 2015."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Al Khobar, the Kingdom of Saudi Arabia",
            image_desc: {
              image_name: "Saudi_Arabia_190615.jpg",
              desc:
                "HE Mr Laurens Westhoff (Ambassador of the Kingdom of the Netherlands to Saudi Arabia), inaugurating the Netherlands Visa Application Centre with Al Etimad Modern Business Solutions and VFS Global in Al Khobar, Kingdom of Saudi Arabia on 16 June 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Baku, Azerbaijan",
            image_desc: {
              image_name: "baku_VAC_270615.jpg",
              desc:
                "Ms Vita Freimane (Second Secretary - Consul) and Ms Leva Majore (Chargé d'affaires a.i) from the Embassy of the Republic of Latvia in the Republic of Azerbaijan visited the Joint Visa Application Centre in Baku, Azerbaijan on 8 June 2015."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Dubai, the UAE",
            image_desc: {
              image_name: "Netherlands_in_DUBAI_190615.jpg",
              desc:
                "Mr Robert De Leeuw (Consul General of the Kingdom of Netherlands in Dubai) and Mr Ajit Alexander  (COO – Middle East and Africa, VFS Global) inaugurating the Netherlands Visa Application Centre in Dubai, the UAE on 10 June 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Istanbul, Turkey",
            image_desc: {
              image_name: "Finland_270615.jpg",
              desc:
                "Ms Päivi Laivola Donin de Rosière (Director, Unit for EU Enlargement and Western Balkans) Ms Laura Kamras (Counsellor at the Ministry for Foreign Affairs of Finland) and Ms  Anna – Lüsa Posantı (Honorary Consulate General of Finland, Istanbul) visited the Joint Visa Application Centre in Istanbul,  Turkey on 4 June 2015."
            }
          },
          {
            title:
              "Inauguration of Croatia Visa Application Centre in New Delhi, India",
            image_desc: {
              image_name: "DSC_13615.jpg",
              desc:
                "HE Mr Amir Muharemi (Ambassador of Croatia in India) and Mr Vinay Malhotra (COO – South Asia and DVPC, VFS Global) inaugurating  the Croatia Visa Application Centre in New Delhi, India on 5 June 2015."
            }
          },
          {
            title:
              "Inauguration of South Africa Visa Application Centre in Kampala, Uganda",
            image_desc: {
              image_name: "Kampala_uganda_1_070315.jpg",
              desc:
                "Ms Wendy Swartz (Counsellor, Political Affairs at the South African High Commission in Uganda), Ms T A Masoga (First Secretary (Immigration & Civic Affairs, South Africa High Commission in the Republic of Uganda) and Mr Jiten Vyas (COO –  Africa, VFS Global) inaugurating the South Africa Visa Application Centre in Kampala, Uganda on 2 June 2015."
            }
          },
          {
            title:
              "Inauguration of Norway Visa Application Centre in Kampala, Uganda",
            image_desc: {
              image_name: "Kampala_uganda_2_070315.jpg",
              desc:
                "HE Mr Thorbjorn Gaustadsaether (Ambassador of Norway in Uganda) and Mr Mohamed Shafi (Head of Visa and Immigration Section, Royal Norwegian Embassy in Kampala) inaugurating the Norway Visa Application Centre in Kampala, Uganda on 1 June 2015."
            }
          },
          {
            title:
              "Inauguration of Norway Visa Application Centre in Amman, Jordan",
            image_desc: {
              image_name: "Jordan_06415.jpg",
              desc:
                "HE Ms Sissel Breie (Ambassador of Norway to Jordan) and Ms Yummi Talwar (Regional Head – Middle East, VFS Global) inaugurating the Norway Visa Application Centre in Amman, Jordan on 1 June 2015."
            }
          },
          {
            title:
              "VFS Global wins award at International Business Excellence Awards 2015",
            image_desc: {
              image_name: "Award_230515.jpg",
              desc:
                "In  recognition of its continuing success VFS Global, a trusted partner and leader  in the industry of visa processing, was awarded top honours in International  Business Excellence Awards 2015 (IBX Awards) held in Dubai on 20 May 2015 and  21 May 2015. Competing against the region’s most prominent companies from  diverse industries, VFS Global won an award in the Towards 2020 category. The award was presented by Ms Helen Nellis (Lord Lieutenant  of Bedfordshire), which was received by Mr Srinarayan Sankaran (COO –  Business Development) on behalf of VFS Global).<br><br>Towards  2020, a category that measures innovation, entrepreneurship and opportunism,  VFS Global won the Opportunity Award for its innovative solution LIDPro™<sup>*</sup>  (Location Independent Document Processing) that was developed in partnership  with the Ministry of Foreign Affairs, Finland.<br><br><sup>*</sup>Patent pending. Copyright 2012. All rights reserved by VFS Global Services Pvt Ltd"
            }
          },
          {
            title:
              "Inauguration of Department of Home Affairs (DHA) Premium Visa and Permit Centre in Johannesburg, South Africa",
            image_desc: {
              image_name: "Inauguration_DHA_250515.jpg",
              desc:
                "The Department of Home Affairs (DHA) Premium Visa and Permit Centre was inaugurated of at Sandton, Johannesburg, by the Honourable Minister of Home Affairs of the Republic of South Africa, Mr Malusi Gigaba on 22 May 2015.<br><br>This premium centre is the result of a partnership between Gauteng Provincial Government’s Gauteng Growth and Development Agency (GGDA) and VFS Global to support the effort to offer a ‘one stop shop’ to prospective investor and exporters and improve ease of doing business in Gauteng."
            }
          },
          {
            title:
              "Visit at the Thailand Visa Application Centre in Kolkata, India",
            image_desc: {
              image_name: "Kolkata_270615.jpg",
              desc:
                "Mr Preecha Kaensa (Consul General of Thailand) visited the Thailand Visa Application Centre in Kolkata, India on 15 May 2015."
            }
          },
          {
            title:
              "Inauguration of Canada Visa Application Centre in Medellin, Colombia",
            image_desc: {
              image_name: "Colombia_40615.jpg",
              desc:
                "HE Ms Carmen Sylvain (Ambassador of Canada in Colombia) and Mr Alok Singhal (Regional Head- Latin America) inaugurating the Canada Visa Application Centre in Medellin, Colombia on 13 May 2015."
            }
          },
          {
            title:
              "Visit at the Norway Visa Application Centre in Cebu, Philippines",
            image_desc: {
              image_name: "Norway_VAC_inaug_130515.jpg",
              desc:
                "Mr Kjetil Bjørnstad (First Secretary Royal Norwegian Embassy, Manila) visited the Norway Visa Application Centre in Cebu, Philippines on 11 May 2015."
            }
          },
          {
            title:
              "Inauguration of Portugal Visa Application Centre in Jeddah, the Kingdom of Saudi Arabia",
            image_desc: {
              image_name: "Portugal_VAC_inaug_040515.jpg",
              desc:
                "HE Mr Manuel Carvalho (Ambassador of Portugal to the Kingdom of Saudi  Arabia), HRH Prince Faisal Abdullah Al-Faisal (President of Al-Etimad Modern  Business Solutions Company) and  Mr Ajit  Alexander (COO – Middle East & Africa, VFS Global) inaugurating the  Portugal Visa Application Centre in Jeddah, the Kingdom of Saudi Arabia on 3  May 2015."
            }
          },
          {
            title:
              "Inauguration of Vietnam Visa Application Centre in Hyderabad, India",
            image_desc: {
              image_name: "Vietnam_VAC_inaug_300415.jpg",
              desc:
                "HE Mr Ton Sinh Thanh (Ambassador of Vietnam in India) and Mr Vinay Malhotra (COO – South Asia and DVPC, VFS Global) inaugurating the Vietnam Visa Application Centre in Hyderabad, India on 27 April 2015."
            }
          },
          {
            title:
              "Visit at the India Visa and Consular Application Centre in Bradford, the UK",
            image_desc: {
              image_name: "Bradford_VAC_visit_150515.jpg",
              desc:
                "Dr Virander Paul (Deputy High Commissioner of India in the UK), Mr Pritam Lal (First Secretary (Coordination), High Commission of India, London and Ms Geeta Upadhayaya (Artistic Director, Kala Sangam, Bradford) visited the India Visa and Consular Application Centre, in Bradford, the UK on 24 April 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre, in Beirut, Lebanon",
            image_desc: {
              image_name: "Visit_in_Lebanon_280415.JPG",
              desc:
                "HE Ms Michelle Cameron (Ambassador of Canada to Lebanon) visited the Joint Visa Application Centre in Beirut, Lebanon, on 17 April 2015."
            }
          },
          {
            title:
              "Inauguration of Schengen Visa Application Centre in Kyiv, Ukraine",
            image_desc: {
              image_name:
                "Inauguration_of_Schengen_Visa_Application_Centre_in_Kyiv_130515.JPG",
              desc:
                "HE Mr Vassilis Papadopoulos, Ambassador Extraordinary and Plenipotentiary of Hellenic Republic in Kyiv, Mr Thomas Bronder (Consul, Royal Norwegian Embassy in Kyiv),Ms Minna Kuronen, (Head of Visa Section, Embassy of Finland in Kyiv), Mr Jean De Lannoy (Deputy Head of Mission, Embassy of Belgium in Kyiv), Mr Guidas Kerushauskas (Charge d’affaires, Embassy of the Republic of Lithuania in Kyiv), Mr Rafał Wolski, (Consul General, Head of the Consular Section, Embassy of the Republic of Poland in Kyiv), Ms Carina Mylin (Head of Visa Section, Royal Danish Embassy in Kyiv), Ms Karin Eriksby (Consul, Embassy of Sweden in Kyiv), Mr Janos Kollar (Head of Consular Section, Embassy of Hungary in Kyiv), Mr Georg Erlsbacher (Consul, Embassy of Austria in Kyiv), Mr Pavel Pesek (Consul, Embassy of Czech Republic in Kyiv) and Mr Victor Murcia Garzon (Consul, Embassy of Spain in Kyiv) inaugurating the Schengen Visa Application Centre in Kyiv, Ukraine on 16 April 2015."
            }
          },
          {
            title:
              "Inauguration of Norway Visa Application Centre in Dakar, Senegal",
            image_desc: {
              image_name: "Norway_in_Dakar_150415.JPG",
              desc:
                "Ms Synnøve Stavdal (Head of Administration, Royal Norwegian Embassy in Accra) inaugurated the Norway Visa Application Centre in Dakar, Senegal on 10 April 2015."
            }
          },
          {
            title:
              "Inauguration of Joint Visa Application Centre in London, United Kingdom",
            image_desc: {
              image_name: "image_london_100415.jpg",
              desc:
                "Representatives of Schengen client governments inaugurating the new Joint Visa Application Centre in London, United Kingdom, on 27 March 2015."
            }
          },
          {
            title:
              "Inauguration of Sweden Visa Application Centre in Pskov, Russia",
            image_desc: {
              image_name: "events_030415.jpg",
              desc:
                "Mr Ivan N Tsetsersky (Head of the Pskov City) and Mr Erik Hammarskjöld  (Consul General of Sweden in St. Petersburg) inaugurating the Sweden Visa Application Centre in Pskov, Russia on 23 March 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "img_01_300315.jpg",
              desc:
                "Mr Yves Perrin (Consul General) and Mr Andre Ruche (Consul) from the Consulate General of France in Mumbai visited the Joint Schengen Visa Application Centre in Mumbai on 23 March 2015."
            }
          },
          {
            title:
              "Visit at the Australia Visa Application Centre in Hong Kong, P. R. China",
            image_desc: {
              image_name: "IMAG_250315.jpg",
              desc:
                "Mr Jim Williams (First Assistant Secretary, Visa and Citizenship Management, Department of Immigration and Border Protection) and Ms Erica Biddle (Consul (Immigration), Australian Consulate General in Hong Kong, P. R. China) visited the Australia Visa Application Centre in Hong Kong, P.R.China on 20 March 2015."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre in Jeddah, Saudi Arabia",
            image_desc: {
              image_name: "IMAG_060415.jpg",
              desc:
                "HE Mr Simon Paul Collis CMG (Her Majesty’s Ambassador to the Kingdom of Saudi Arabia) accompanied by Mr Mohammad Shaukat (Consul General of UK in Jeddah) visited the UK Visa Application Centre in Jeddah, Saudi Arabia on 17 March 2015."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "events1_030415.jpg",
              desc:
                "Dignitaries from the Consulate General of Belgium in Mumbai, including Mr Karl van den Bossche (Consul General), Mr Bernard Jacxsens (Consul (Consular and Administrative Affairs) and Ms Joséphine Nirwonagize (Visa Officer), and Ms Mia Van Lil (Consul) from the Ministry of Foreign Affairs, Brussels, visited the Joint Visa Application Centre in Mumbai, India on 17 March 2015."
            }
          },
          {
            title:
              "Inauguration of the Thailand Visa Application Centre in Kolkata, India",
            image_desc: {
              image_name: "IMG_events_240315.jpg",
              desc:
                "Ms Pattira Chiempricha (Acting Consul-General, The Royal Thai Consulate-General in Kolkata) inaugurated the Thailand Visa Application Centre in Kolkata, India, on 17 March 2015."
            }
          },
          {
            title:
              "Visit at the Thailand Visa Application Centre in Bengaluru, India",
            image_desc: {
              image_name: "Ms_Chantana_Seelsorn_250315.jpg",
              desc:
                "Ms Chantana Seelsorn Lao (Head of Passport and Visa Section from the Royal Thai Consulate General, Chennai) visited the Thailand Visa Application Centre in Bengaluru, India on 16 March 2015."
            }
          },
          {
            title:
              "Inauguration of Norway Visa Application Centre in Accra, Ghana",
            image_desc: {
              image_name: "Norway_Visa_Application_Centre_in_Accra_130315.jpg",
              desc:
                "Ms Synnøve Stavdal (Head of administration, Royal Norwegian Embassy in Accra) inaugurated the Norway Visa Application Centre in Accra, Ghana, on 10 March 2015."
            }
          },
          {
            title:
              "Visit at the Canada Visa Application Centre in Bengaluru, India",
            image_desc: {
              image_name: "Mr_Daniel_Vaugh_250315.jpg",
              desc:
                "Mr Daniel Vaughn (Regional Director for Canada, South Asia) and Ms Sarah Finall (Consul and Immigration Program Manager , Consulate General of Canada) visited the Canada Visa Application Centre in Bengaluru, India on 3 March 2015."
            }
          },
          {
            title:
              "Inauguration of Cyprus Visa Application Centre in Beirut, Lebanon",
            image_desc: {
              image_name: "Cyprus_Visa_Application_Centre_in_Beirut_050315.jpg",
              desc:
                "HE Homer A Mavrommatis (Ambassador of Cyprus in Lebanon) and Zaher Saab (Regional Operations Manager, Mawared House) together with Mr Ajit Alexander (COO – Middle East and Africa, VFS Global), inaugurated the Cyprus Visa Application Centre in Beirut, Lebanon on 2 March 2015."
            }
          },
          {
            title:
              "Visit at the Australia Visa Application Centre in Bengaluru, India",
            image_desc: {
              image_name: "MS_Deborah_Shalla_250315.jpg",
              desc:
                "Ms Deborah Shalla (Second Secretary (Immigration)) and Ms Prerna Megha Pandarwani (Team Leader, Australian High Commission, New Delhi) visited the Australia Visa Application Centre in Bengaluru, India on 27 February 2015."
            }
          },
          {
            title:
              "Inauguration of Joint Visa Application Centre in Makati City, Philippines",
            image_desc: {
              image_name:
                "Joint_Visa_Application_Centre_in_Makati_City_050315.jpg",
              desc:
                "Ms Pia Heide Salman (Consul, Royal Danish Embassy in Manila) and Mr Kjetil Bjornstad (First Secretary, Royal Norwegian Embassy) inaugurated the Joint Visa Application Centre in Makati City, Philippines on 20 February 2015."
            }
          },
          {
            title:
              "Inauguration of India Visa Application Centre in Seoul, South Korea",
            image_desc: {
              image_name: "India_VAC_inauguration_South_Korea_040215.JPG",
              desc:
                "H E Mr Vishnu Prakash (Ambassador of India to South Korea) accompanied by Mr Ved Pal Singh, (First Secretary, Embassy of India, Seoul) inaugurating the India Visa Application Centre in Seoul, South Korea on 3 February 2015."
            }
          },
          {
            title:
              "Inauguration of Germany Visa Application Centre in St. Petersburg, Russia",
            image_desc: {
              image_name:
                "Germany_Visa_Application_Centre_in_St.-Petersburg_050315.jpg",
              desc:
                "Dr Heike Peitsch (Consul General of the Federal Republic of Germany in St. Petersburg) and Mr Srinarayan Sankaran, (COO – Russia & CIS, VFS Global), inaugurated the Germany Visa Application Centre in St. Petersburg, Russia, on 30 January 2015."
            }
          },
          {
            title:
              "Visit at the Denmark Visa Application Centre in Makati City, Philippines",
            image_desc: {
              image_name: "Denmark_VAC_in_Makati_City_050315.jpg",
              desc:
                "Ms Maya Åkerlund Petersen (Head of Section, Ministry of Foreign Affairs of Denmark) visited the Denmark Visa Application Centre in Makati City, Philippines on 30 January 2015."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Durban, South Africa",
            image_desc: {
              image_name: "South_Africa_200215.JPG",
              desc:
                "Mr Robert-Jan Siegert (Deputy Head of Mission, Embassy of the Kingdom of the\n      Netherlands) and Mr Jiten Vyas (COO - Africa, VFS Global) inaugurating the Netherlands Visa Application Centre in Durban, South Africa on 30 January 2015."
            }
          },
          {
            title:
              "Visit at the New Zealand Visa Application Centre in Guangzhou, P. R. China",
            image_desc: {
              image_name: "Visit_in_Shanghai_040215.jpg",
              desc:
                "HE Mr John McKinnon (Ambassador of New Zealand to P. R. China), Mr Craig Foss (Associate Minister of Immigration) and Mr Nigel Bickle (Head of Immigration New Zealand) visited the New Zealand Visa Application Centre in Guangzhou, P. R. China on 28 January 2015."
            }
          },
          {
            title:
              "Inauguration of Italy Visa Application Centre in Kathmandu, Nepal",
            image_desc: {
              image_name: "nepal_240115.jpg",
              desc:
                "Mr Cesare Bieller (Consul General of Italy in Kolkata) & Mr Atul Marwah (Head of Operations – North & East India, VFS Global) inaugurating the Italy Visa Application Centre in Kathmandu, Nepal on 21 January 2015."
            }
          },
          {
            title:
              "Inauguration of the Netherlands Visa Application Centre in Cape Town, South Africa",
            image_desc: {
              image_name: "210115_1.jpg",
              desc:
                "Ms Bonnie P E Horbach (Consul General of the Kingdom of the Netherlands) inaugurating the Netherlands Visa Application Centre in Cape Town, South Africa on 16 January 2015."
            }
          },
          {
            title:
              "Inauguration of Sweden Visa Application Centre in Dubai, the UAE",
            image_desc: {
              image_name: "210115_2.jpg",
              desc:
                "HE Mr Jan Thesleff, (Ambassador of Sweden to the UAE) and Mr Ajit Alexander (Chief Operating Officer – Middle East & Africa, VFS Global) inaugurating for Sweden Visa Application Centre in Dubai, the UAE on 15 January 2015."
            }
          },
          {
            title:
              "Visit at the France Visa Application Centre in Ahmedabad, India",
            image_desc: {
              image_name: "events2_030415.jpg",
              desc:
                "Mr Jean- Marc Sere-Charlet (Minister Counsellor and Deputy Head of Mission at the Embassy of France in India)"
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "210115_4.jpg",
              desc:
                "HE Mr Jürg Burri (Ambassador and Director General of the Consular Directorate of the Federal Department of Foreign Affairs of Switzerland) and Mr Ulrich Haug (Head of Visa Section, Consulate General of Switzerland in Mumbai) visited the Joint Visa Application Centre in Mumbai, India on 12 December 2014."
            }
          },
          {
            title:
              "Inauguration of a new Citizen Services Centre in Bhubaneshwar, India",
            image_desc: {
              image_name: "India_251214.jpg",
              desc:
                "Mr Gokul Chandra Pati (Chief Secretary, Odisha), Shri (Dr) Krishan Kumar (Vice Chairman, BDA and Commissioner Bhubaneswar Municipal Corporation), Mr Ananta Narayan Jena (Mayor), Shri Pushpendra Singh Deo (Honorable Minister Housing  and Urban Development, Odisha), Shri G Mathivathanan (Secretary, Housing and Urban Development department, Odisha) and Mr Anil Katoch (COO – Front Office Service, VFS Global) at the inauguration of a new Citizen Service Centre in Bhubaneshwar on 12 December 2014.<br><br>Shri Pushpendra Singh Deo, Minister H and UD, Odisha, officially inaugurated the new Citizen Services Centre of Bhubaneshwar Development Authority (BDA) for building plan approvals and occupancy certificates. This centre is located in Samantha Vihar and shall receive applications for processing at BDA. BDA will effectively manage the core function of adjudication from main office and the sanction letters will be handed back to the applicants via BDA Citizen Service Centres operated by VFS Global. The BDA has appointed VFS Global to operate two new Citizen Service Centres on its behalf in the city."
            }
          },
          {
            title:
              "Visit at the Canada Visa Application Centre in Sao Paolo, Brazil",
            image_desc: {
              image_name: "Brazil_171214.jpg",
              desc:
                "Mr Mark Giralt (Minister-Counsellor for Immigration, Embassy of Canada) and Mr Bernard Leclerc (CIC Immigration Program Manager, Sao Paolo) visited the Canada Visa Application Centre in Sao Paolo, Brazil on 8 December 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "210115_6.jpg",
              desc:
                "Ms Françoise Le Bouter, (Attachée, Consulate General of France in Mumbai) and Mr Philippe Righini (Foreign Affairs Adviser in charge of the mission for Visa Policy, Ministry of Visa Policy) visited the Joint Visa Application Centre in Mumbai, India on 5 December 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "India_1_191114.jpg",
              desc:
                "Ms Silvia Costantini (First Counsellor – Political Affairs, Delegation of the European Union to India) and Mr Giorgio Imparato (Head – Visa Department, Consulate General of Italy in Mumbai) visited the Joint Visa Application Centre in Mumbai, India on 14 November 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "India_2_191114.jpg",
              desc:
                "Mr Martin Bienz (Consul General, Consulate General of Switzerland in Mumbai) visited the Joint Visa Application Centre in Mumbai, India on 13 November 2014."
            }
          },
          {
            title:
              "Visit at the Denmark Visa Application Centre in Ottawa, Canada",
            image_desc: {
              image_name: "210115_7.jpg",
              desc:
                "Dignitaries from the Royal Danish Embassy in Ottawa, including HE Mr Niels Boel Abrahamsen (Ambassador of Denmark to Canada) accompanied by Ms Pia Bach Pape Stenholt (Vice consul), and Mr Søren Vøhtz (Head of Division), Ms Iben Rasmussen (Head of Section) and Mr Kim Christiansen (Special Advisor) from the Ministry of Foreign Affairs of Denmark visited the Denmark Visa Application Centre in Ottawa, Canada on 10 November 2014."
            }
          },
          {
            title:
              "Visit at the Canada Visa Application Centre in Seoul, South Korea",
            image_desc: {
              image_name: "South_Korea_191114.jpg",
              desc:
                "Mr Simon Varricchio (Immigration Officer, Economic Class Permanent Resident Unit, Government of Canada, Manila) visited the Canada Visa Application Centre in Seoul, South Korea on 10 November 2014."
            }
          },
          {
            title:
              "Inauguration of the Czech Republic Visa Application Centre in Kyiv, Ukraine",
            image_desc: {
              image_name: "210115_8.jpg",
              desc:
                "HE Mr Ivan Počuch  (Ambassador of Czech Republic to Ukraine) and Mr Pavel Pešek (Consul,  Head of the Consular Section, Embassy of Czech Republic in Kyiv, Ukraine ) inaugurating the Czech Republic Visa Application Centre in Kyiv, Ukraine on 3 November 2014."
            }
          },
          {
            title:
              "Visit at the Visa and Permit Facilitation Centre in Pretoria South Africa",
            image_desc: {
              image_name: "210115_9.jpg",
              desc:
                "Dignitaries from the Ghana Immigration Service, Accra, Ghana, including Mr Kojo Oppong Yeboah, (Comptroller and Head of Visa/Permit Section) Mr Louis Francis Aikens, (Assistant Director) and Mr Jack Monedi, (Chief Director- Permits, Department of Home Affairs, South Africa) visited the Visa and Permit Facilitation Centre in Pretoria South Africa on 28 October 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Kolkata, India",
            image_desc: {
              image_name: "India_3_191114.jpg",
              desc:
                "Dignitaries from the Royal Thai Consulate General in Kolkata including Mr Phakkawat Chantrangsri (Consul), Ms Montakan Hengsuwan (Vice Consul) (second from right) and Ms Pattira Chiempricha (Consul) visited the Joint Visa Application Centre in Kolkata, India on 24 October 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "india_5_191114.jpg",
              desc:
                "A delegation from the Consulate General of Italy in Mumbai led by Mr Giorgio Imparato (Head – Visa Department, Consulate General of Italy in Mumbai) visited the Joint Visa Application Centre in Mumbai, India on 17 October 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Sydney, Australia",
            image_desc: {
              image_name: "Australia_191114.jpg",
              desc:
                "Dignitaries from the Royal Norwegian Embassy including Ms Gry Evenrud (First Secretary) and Ms Kaja Erichsen Glomm (First Secretary) visited the Joint Visa Application Centre in Sydney, Australia on 14 October 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Dakar, Senegal",
            image_desc: {
              image_name: "210115_10.jpg",
              desc:
                "Ms Francesca Oldelli (Vice-Consul,Embassy of Switzerland in Dakar, Senegal), Ms Norma Schenker (Consul & Second  Secretary, Embassy of Switzerland in Dakar, Senegal), Mr Bruno Dubois (Head of the Visa Section, Consulate General of France in Dakar), Mr Martin Stein (Head of the Visa Section, Embassy of Germany in Dakar, Senegal), Mr Gerco Broekstra (Head of Administrative and Consular Affairs, the Netherlands Embassy in Dakar, Senegal, Ministry of Foreign Affairs, the Netherlands), Ms Karolina Stasiak (Political advisor, Political section – Press and Information, Delegation of the European Union in the Republic of Senegal), Ms Martine Ozanne (First Secretary, Embassy of the Netherlands in Dakar, Senegal), Mr Günther Zimmer (First Secretary, Embassy of Austria in Dakar, Senegal) and Ms Simina Filip (Consular Agent, Embassy of Romania) visited the Joint Visa Application Centre in Dakar, Senegal on 8 October 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Dakar Senegal",
            image_desc: {
              image_name: "210115_11.jpg",
              desc:
                "Ms Monique Diebold–Pacetti (Vice Head of Political Mission of the Foreign Ministry of France, Paris, France), Mr Phillippe Truquet (Consul, Consulate General of France in Abidjan, Cote d’Ivoire), and Mr Alain Jouret (Consul) and Ms Marie Christine (Vice consul) from the Consulate General of France in Dakar, Senegal visited the Joint Visa Application Centre in Dakar Senegal on 7 October 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "India_4_191114.jpg",
              desc:
                "Dignitaries from the Ministry of External Affairs of France, including Mr Nicolas Warnery, Mr Christian Reigneaud, Mr Marc Abensour and Mr Xavier Driencourt along with Mr Jean-Raphael Peytregnet (Consul General) and Mr André Ruche (Vice Consul) from the Consulate General of France in Mumbai visited the Joint Visa Application Centre in Mumbai, India, on 25 September 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre in Johannesburg, South Africa",
            image_desc: {
              image_name: "South_Africa_50914.jpg",
              desc:
                "Mr Jose Cesario (Secretary of State of Portuguese Communities Abroad) and Dr Luisa Fragoso (Consul General of Portugal in Johannesburg, South Africa) visited the Joint Visa Application Centre in Johannesburg, South Africa on 26 August 2014."
            }
          },
          {
            title:
              "Visit at the SchengenVisa Application Centre in Bangkok, Thailand",
            image_desc: {
              image_name: "bangkok_310814.jpg",
              desc:
                "Ms Cecilia Stal (Consul, Embassy of Sweden in Bangkok), Ms Monica Wendelby (Director of Division for European and international co-operation) Ms Agneta Kundoori (Team Leader - Division for European and International Cooperation, Migrationsverket) and Mr Milan Bobic, (Expert/coordinator, Swedish Migration Board) from the Swedish Ministry visited the SchengenVisa Application Centre in Bangkok, Thailand on 21 August 2014."
            }
          },
          {
            title:
              "Visit at the Joint Schengen Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "jvac_mumbai_190814.jpg",
              desc:
                "HE Mr Ioannis E Raptakis, Ambassador of Greece to India visited the Joint Schengen Visa Application Centre in Mumbai, India, on 13 August 2014."
            }
          },
          {
            title:
              "Visit at the UK Visa Application Centre Visa Application Centre in Beijing, P. R. China",
            image_desc: {
              image_name: "uk_beijing_190814.jpg",
              desc:
                "Mr James Brokenshire (Immigration and Security Minister - Home Office – UK Visas & Immigration and Member of the British Parliament) along with Mr Simon Peachey, (Regional Director – Asia Pacific, UKVI) visited the UK Visa Application Centre in Beijing, P.R.China, on 28 July 2014."
            }
          },
          {
            title:
              "VFS Global supports the Green Circle Project cause in Nepal",
            image_desc: {
              image_name: "project_nepal_190814.jpg",
              desc:
                "At the launch of the Green Circle Project, a WEPCO (Women’s Environment Preservation Committee) initiative, VFS Global was presented with a membership into the environmental initiative on 22 July 2014. The event was conducted at Hotel Yak and Yeti, Nepal. Through this endeavour, VFS Global shall now strive to delve deeper in the adoption of environment-friendly office practices. This particular project commenced to encourage a ‘reduce-reuse-recycle’ approach to paper usage within organisations in Nepal. As a member-organisation, VFS Global shall direct waste papers generated within the organisation, to Green Circle, of which they would craft paper products.\n      \n      The membership presentation was done by Dr Krishna Chandra Paudel, Secretary, Ministry of Science, Technology and Environment, Nepal, in the presence of Ms Bishnu Thakali, President of WEPCO."
            }
          },
          {
            title:
              "Visit at the Immigration New Zealand (INZ) Visa Application Centre in Seoul, South Korea",
            image_desc: {
              image_name: "southkorea_310814.jpg",
              desc:
                "Mr Jock Gilray (Consul – Immigration, New Zealand Immigration Service, Shanghai) and Ms Catherine Beach (Immigration Manager, Immigration New Zealand, Shanghai) visited the Immigration New Zealand (INZ) Visa Application Centre in Seoul, Republic of  Korea on 16 July 2014."
            }
          },
          {
            title:
              "Inauguration of  Visa and Permit Facilitation Centre in Johannesburg, South Africa",
            image_desc: {
              image_name: "Inauguration_of_visa_210714.jpg",
              desc:
                "Mr Malusi Gigaba, (Minister of Home Affairs - Republic of South Africa), officially inaugurated the Visa and Permit Facilitation Centre in Johannesburg, South Africa, on 14 July 2014. Mr Mkuseli Apleni, (Director General of Home Affairs), Mr Zubin Karkaria (CEO - VFS Global Group) and Mr Alan Smith (Chairperson-Immigration Advisory Board) also graced the occasion with their august presence."
            }
          },
          {
            title:
              "Visit at the Canada Visa Application Centre, New Delhi, India",
            image_desc: {
              image_name: "newdelhi_310814.jpg",
              desc:
                "Mr Sidney Frank, (Minister and Immigration Program Manager, High Commission of Canada, New Delhi) Mr Christopher Alexander (Minister of Citizenship & Immigration, Government of Canada), Ms Sarah Hayward, Manager (Temporary Resident Unit - High Commission of Canada, New Delhi) visited the Canada Visa Application Centre in New Delhi, India on 8 July 2014."
            }
          },
          {
            title:
              "Visit at the Joint Visa Application Centre (JVAC) Bogotá, Colombia",
            image_desc: {
              image_name: "colombia_310814.jpg",
              desc:
                "HE Mr Joao de Almeida (Ambassador of Portugal to Colombia) Mr Joao Cotrim Figueiredo, (President of Turismo de Portugal), Sra Sandra Magalhaes, Consul General of Portugal to Colombia , Mr Adolfo Mesquita Nunes (Vice Minister of tourism)  visited the Joint Visa Application Centre in Bogota, Colombia on 3 July 2014."
            }
          },
          {
            title:
              "Visit at the Joint Schengen Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "mumbai_bharat_080714.jpg",
              desc:
                "Mr Bernard Jacxsens (Consul-Consular and Administrative Affairs) along with a delegation from the Consulate General of Belgium, Mumbai, including Ms Josephine Nirwonagize (Vice Consul), Ms Pinkey Ahluwalia (Vice Consul), and Ms Hélène Jillemont (Trainee Visa Officer), visited the Joint Schengen Visa Application Centre in Mumbai, India, on 1 July 2014."
            }
          },
          {
            title:
              "Inauguration of Schengen Visa Application Centre in Dhaka, Bangladesh",
            image_desc: {
              image_name: "service_provider_1_090614.jpg",
              desc:
                "HE Mr Luis Tejada (Ambassador of Spain to Bangladesh), HE Ms Anneli Lindahl Kenny (Ambassador of Sweden to Bangladesh), Mr Vishal Jairath (Regional Head - South Asia, VFS Global) and Mr Subhadip Sikdar (Country Manager-Bangladesh, VFS Global), inaugurating the new Schengen Visa Application Centre in Dhaka, Bangladesh, on 3 June 2014."
            }
          },
          {
            title:
              "Inauguration of Switzerland Visa Application Centre in Manama, Bahrain",
            image_desc: {
              image_name: "service_provider_2_090614.jpg",
              desc:
                "HE Etienne Thévoz (Ambassador of Switzerland to the State of Kuwait and the Kingdom of Bahrain), Ambassador Dr Dhafer A Alumran ( Director of Bilateral Relations - Ministry of Foreign Affairs, Kingdom of Bahrain), Mr Paul John Maliekkal (Regional CEO - Africa, Americas, Australasia, Europe and Middle East, VFS Global), Mr Uve Haueter (First Secretary and Deputy Chief of Mission, the Embassy of Switzerland to Kuwait and Bahrain) and Mr Mohan Mathew (COO - Al Etimad), at the inauguration of Switzerland Visa Application Centre in Bahrain, on 1 June 2014."
            }
          },
          {
            title:
              "Visit at the Joint Schengen Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "sva.jpg",
              desc:
                "Mr Jean-Raphaël Peytregnet (Consul General of France in Mumbai) and Mr Marc-Antoine Hureau (Vice Consul, Head of Chancery) from the Consulate General of France in Mumbai, visited the Joint Schengen Visa Application Centre in Mumbai, India on 15 May 2014."
            }
          },
          {
            title:
              "Inauguration of UK Visa Application Centre in Hong Kong, China",
            image_desc: {
              image_name: "uk_hongkong_190814.jpg",
              desc:
                "Kevin McLaven (Deputy Director - British Council, Hong Kong), Tony Moore (Regional Manager - East Asia, Australasia and Mongolia, UK Visas and Immigration, Home Office), Ms Caroline Wilson (British Consul General to Hong Kong and Macao) and Mr Mark Simmonds (Parliamentary Under Secretary of State for Foreign and Commonwealth Affairs MP) along with representatives from VFS Global at the inauguration of the UK Visa Application Centre in Hong Kong, China on 5 May 2014."
            }
          },
          {
            title:
              "Visit at the China Visa Application Service Centre in Kolkata, India",
            image_desc: {
              image_name: "chinese_app_260414.jpg",
              desc:
                "Mr Dou Zhenjiang (Consul, the Consulate General of the People’s Republic of China in Kolkata), Mr Maoyi Zhou (Deputy Consul General, the Consulate General of the People’s Republic of China in Kolkata) and Mr Shan Xuejia (Consul, the Consulate General of the People’s Republic of China in Kolkata) visited Chinese Visa Application Service Centre in Kolkata, India on 25 April 2014."
            }
          },
          {
            title:
              "Visit at Austria Visa Application Centre in Shanghai, China",
            image_desc: {
              image_name: "austria_170414.jpg",
              desc:
                "Dignitaries from the Consulate General of Austria in Shanghai including Ms Silvia Neureiter (Consul General), Mr Ralph Kindl (Attaché) and Ms. Nicole Prikoszovich (Attaché) visited the Austria Visa Application Centre in Shanghai, China on 3 April 2014."
            }
          },
          {
            title:
              "Visit at New Zealand Visa Application Centre in Shanghai, China",
            image_desc: {
              image_name: "New_zealand_040414.jpg",
              desc:
                "A delegation from the Immigration New Zealand including Mr Nigel Bickle (Deputy Chief Executive), Mr Peter Thomas (Deputy Chief Executive), Mr Peter Holbert (Manager in Finance), Mr Dean Wightman (Business Analyst) and Mr Dominic Forde (Market Manager) visited the New Zealand Visa Application Centre in Shanghai, China on 31 March 2014."
            }
          },
          {
            title:
              "Inauguration of Submission Counters for German-Russian Chamber of Commerce (AHK) at Germany Visa Application Centre in Moscow, Russia",
            image_desc: {
              image_name: "inauguration_moscow_260414.jpg",
              desc:
                "Dr Georg Birgelen (Deputy Ambassador, The Federal Republic of Germany in Moscow, Russia), Mr Michael Harms (Executive Director, AHK) and Mr Prabuddha Sen (Head of Operations, Russia) inaugurating the submission counters for the German-Russian Chamber of Commerce located at the Germany Visa Application Centre in Moscow, Russia on 21 March 2014."
            }
          },
          {
            title:
              "Inauguration of UK Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "Mumbai_India_280314.jpg",
              desc:
                "HE Sir James Bevan KCMG (British High Commissioner to India) and Mr Anil Katoch (Head-South Asia, VFS Global) inaugurated the UK Visa Application Centre in Mumbai, India on 12 March 2014."
            }
          },
          {
            title:
              "Visit at Thailand Visa Application Centre, New Delhi, India",
            image_desc: {
              image_name: "New_Delhi_India_280314.jpg",
              desc:
                "HE Mr Chalit Manityakul (Ambassador of Thailand to India) along with delegation from Ministry of Thailand including Mr Soonthorn Chaiyindeepum (Minister), Ms Chittraporn Lerttaweewit (Second Secretary), Mrs Watchra Maneeprakron (Delegation), Mrs Busba Bunnag (Delegation), Mr Sawanit Kongsiri (Delegation), Mr Jesada Chavarnbhark (Delegation) and Mr Preecha Vajrabhaya (Delegation) visited the Thailand Visa Application Centre in New Delhi, India on 03 March 2014."
            }
          },
          {
            title:
              "Inauguration of Spain Visa Application Centre in Gaza City, Palestinian Territories",
            image_desc: {
              image_name: "Gaza_City_280314.jpg",
              desc:
                "Mr Javier Parrondo (Spanish Deputy Consul General in Jerusalem) inaugurated the Spain Visa Application Centre in Gaza City, Palestinian Territories on 17 February 2014."
            }
          },
          {
            title:
              "Inauguration of Germany Visa Application Centre in Mumbai, India",
            image_desc: {
              image_name: "India_23.01.14.jpg",
              desc:
                "Mr Michael Siebert (Consul General of the Federal Republic of Germany in Mumbai) and Mr Anil Katoch (Head-South Asia, VFS Global) inaugurated the Germany Visa Application Centre in Mumbai, India on 16 January 2014."
            }
          },
          {
            title: "Visit at UK Visa Application Centre in Manila, Philippines",
            image_desc: {
              image_name: "Philippines_23.01.14.jpg",
              desc:
                "HE Mr Asif Ahmad (British Ambassador to the Philippines) and Mr Stephen Thompson (Operations Manager, Visa Section, British Embassy, Manila) visited the UK Visa Application Centre in Manila, Philippines on 14 January 2014."
            }
          },
          {
            title:
              "Inauguration of Austria Visa Application Centre in Erbil, Iraq",
            image_desc: {
              image_name: "Iraq_23.01.14.jpg",
              desc:
                "Mr Anton Pirih (Head of Visa Section, Slovenian Ministry), Mr Zubin Karkaria (Chief Executive Officer, VFS Global Group), General Nazar R Aziz (General Director of Passport & Nationality in Kurdistan Region), Mr Karl-August LUX (Senior Expert for Visa Matters - Austrian Ministry of Foreign Affairs), Dr Mustafa Ramadan (Representative of the Kurdish Government in Austria) and Mr Sagvan Barwary (General Manager, Director of Khazir Company) at the inauguration of the Austria Visa Application Centre in Erbil, Iraq on 13 January 2014."
            }
          }
        ]
      },
      awards: {
        //number of awards news to show at start in page (currently showing 1 news as given here)
        show_at_start: 1,
        //content is shown year wise as provided below
        content_details: [
          {
            year: "2018",
            content: [
              {
                title:
                  "SAP ACE 2018 awards for Strategic HR & Talent Management",
                date: "20 April 2018",
                desc:
                  "At the annual SAP ACE Awards 2018 held in Mumbai, India on 20 April 2018, VFS Global won the Award for Strategic HR & Talent Management. The IT and HR team representatives from VFS Global received the award on behalf of VFS Global, in a glitzy ceremony held at St. Regis, Mumbai.",
                //give show_on_latest: true if you want to show current awards news in "Latest News" section
                show_on_latest: true,
                //give show_on_home: true if you want to show current awards news in Government Home Page
                show_on_home: true
              },
              {
                title:
                  "VFS Global wins “Best Customer Centric Company” award at the Customer Experience Awards",
                date: "1 February 2018",
                desc:
                  "VFS Global has won the “Best Customer Centric Company” award at the Customer Experience Awards held on 1 February 2018 at the Taj Lands End in Mumbai.<br><br>\
			This is the second time VFS Global has bagged an award at the Customer Experience Awards forum; part of The Customer Fest Show 2018.",
                show_on_latest: true
              }
            ]
          },
          {
            year: "2017",
            content: [
              {
                title:
                  "VFS Global awarded for their Customer Service by NCSA, Nigeria ",
                date: "5 October 2017",
                desc:
                  "VFS Global was conferred with the Customer Service award by Nigeria customer service awards (NCSA), which is a prestigious annual awards function that celebrates service excellence across 22 major industries in Nigeria. Deepak Iyer, Regional Head, West Africa, received the award on behalf of VFS Global at a glitzy ceremony held in Abuja on 5 October 2017.",
                show_on_latest: true
              },
              {
                title: "VFS Global wins 5 awards at the World Quality Congress",
                date: "6 and 7 July 2017",
                desc:
                  "VFS Global bagged 5 major awards at the fifth edition of the World Quality Congress 2017. The awards ceremony conducted by the independent, not-for-profit global quality rating agency was held on 6 and 7 July 2017 at the Taj Lands End in Mumbai, in the presence of senior professionals and eminent thought leaders of the industry."
              },
              {
                title: "VFS Global wins award at Arabian Travel Awards 2017",
                desc:
                  "VFS Global has won the award for the 'Best Visa Facilitation Company' at the prestigious Arabian Travel Awards 2017. Vinay Malhotra, COO – Middle East & South Asia, received the award on behalf of VFS Global at the awards ceremony held at the JW Marriott Hotel at Deira in Dubai. <br><br>\
			The Arabian Travel Awards recognises success stories within the travel and hospitality industry in the GCC region. This award ceremony is held annually as a formal Black-Tie ceremony that is graced by the who's who of the Travel & Hospitality industry."
              },
              {
                title: "VFS Global wins the IMC Digital Technology Award",
                desc:
                  "In April 2017, VFS Global was awarded the IMC Digital Technology Award, under the Digitally Enabled Organization in Large Enterprise Category. The award was presented by Padma Bhushan Shri F.C. Kohli on behalf of IMC (Chambers of commerce & industry). Dhiren Savla, CIO, VFS Global accepted the award on behalf of VFS Global at the award ceremony held in Mumbai."
              },
              {
                title: "Golden Peacock National Training Award for 2017",
                date: "19 April 2017",
                desc:
                  "On 19 April 2017, VFS Global was awarded the Golden Peacock National Training Award for 2017 by the esteemed Golden Peacock Awards body, at a ceremony held in Dubai. This award acknowledges VFS Global’s exemplary training practices that contribute towards enhanced business performance."
              },
              {
                title:
                  "VFS Global awarded ‘Most Outstanding Organization of the Year – 2016’ at the Travel & Hospitality Awards",
                date: "14 April 2017",
                desc:
                  "VFS Global was the recipient of the ‘Most Outstanding Organization of the year – 2016’ at the Travel and Hospitality Awards hosted by India’s leading travel monthly Travel and Hospitality. The award function, held in Delhi on 14 April 2017, recognised patrons of the Indian travel and tourism industry, felicitating those who have proven their vision and expertise in this industry on the global platform."
              },
              {
                title:
                  "VFS Global receives 3 awards at the Customer Experience Awards 2017",
                desc:
                  "VFS Global’s Quality Team won 3 awards at the 10<sup>th</sup> edition of the Customer Fest Show 2017 concluded on 09 February in Mumbai. The honours were under the following categories: Best Customer Experience Team, Best Use of Technology to Enhance Customer Experience and Best Customer Experience Leader – Ms. Ramita Vyas. The award recognizes the initiatives taken up by VFS Global to better the overall customer experience through its robust organisational structure, highly skilled staff, and superior technological capabilities."
              }
            ]
          },
          {
            year: "2016",
            content: [
              {
                title:
                  "French President François Hollande bestows prestigious ‘Ordre National du Mérite’ on Zubin Karkaria",
                date: "02 December 2016",
                desc:
                  "Zubin Karkaria, CEO – VFS Global, and CEO – Kuoni Group, was appointed ‘Chevalier de l’Ordre National du Mérite’ (Knight of the National Order of Merit) by the President of the French Republic, François Hollande. The prestigious French award was conferred on Mr. Karkaria by HE Mr. Alexandre Ziegler, Ambassador of France to India, on behalf of President Hollande on 02 December 2016, at a ceremony held in Mumbai, India. The distinction recognises Mr Karkaria’s long-standing contribution in developing travel and tourism to France from across the globe, and acknowledges the role played by VFS Global."
              },
              {
                title:
                  "SAP ACE 2016 awards for Leveraging Enterprise Analytics",
                date: "21 November 2016",
                desc:
                  "At the annual SAP ACE Awards 2016 held in Mumbai, India on 21 November 2016, VFS Global won the Award for Leveraging Enterprise Analytics in the category of Leveraging Analytics and Mobility, which acknowledges Indian businesses that have leveraged SAP solutions to transform the way they operate.<br><br>\
			The award was presented to VFS Global, by Mr Vivek Bapat, Senior Vice President, Global Head of Marketing Strategy from SAP and Mr Rahul Modi, Managing Director from Adarsh Credit Cooperative Society Ltd."
              },
              {
                title:
                  "TAAI honours Zubin Karkaria with its ‘Award of Distinction’",
                date: "14 October 2016",
                desc:
                  "In honour of his long-standing contribution to the Indian travel and tourism industry, Zubin Karkaria, CEO – VFS Global, and CEO – Kuoni Group was conferred with the ‘Award of Distinction’ by the Travel Agents Association of India (TAAI). The award was presented to Mr. Karkaria at the 63<sup>rd</sup> TAAI Convention held in Abu Dhabi on 14 October 2016."
              }
            ]
          },
          {
            year: "2015",
            content: [
              {
                title:
                  "Award in Financial Excellence category: SAP ACE Award 2015",
                date: "2 December 2015",
                desc:
                  "At the annual SAP ACE Awards 2015 held in Mumbai on 2 December 2015, VFS Global won an award in the Financial Excellence category. This recognition acknowledges Digitalist Thought-Leadership maximising SAP solutions to drive massive business-transformation.<br><br>\
			The award was presented to VFS Global by Mr Pierre Gousset, Vice-president (Presales), and Mr Claus Andresen, COO (Acting), Indian Subcontinent, from SAP."
              },
              {
                title:
                  "Express Intelligent Enterprise Award 2015 for LIDPro™<sup>*</sup>: The Indian Express Group-led Express Technology Senate",
                date: "21 August 2015",
                desc:
                  "FS Global was conferred the Express Intelligent Enterprise Award 2015 at a ceremony held at the Fairmont, in Jaipur on 21 August 2015. This award, yet again acknowledges the ingeniousness of this tool that has enabled remote processing of visa applications collected from multiple locations.<br><br>\
			<sup>*</sup>Patent pending. Copyright 2012. All rights reserved by VFS Global"
              },
              {
                title:
                  "IMC-Datamatics Global Services Pvt Ltd Award: IMC IT Awards 2015",
                date: "9 June 2015",
                desc:
                  "On 9 June 2015, VFS Global was felicitated with the IMC-Datamatics Global Services Pvt Ltd Award at a ceremony held in Mumbai. The company won the award in the Large Enterprise BPO/ITES category for its pioneering solution, LIDPro™<sup>*</sup>. The company was chosen winner among renowned organisations from sectors such as banking a, financial services and insurance, education and technology.<br><br>\
			<sup>*</sup>Patent pending. Copyright 2012. All rights reserved by VFS Global "
              },
              {
                title:
                  "Today’s Traveller Award 2015 for Best Visa Service Provider",
                date: "11 August 2015",
                desc:
                  "VFS Global’s continuing efforts in service excellence, has led to the company winning the Today’s Traveller Award 2015 for Best Visa Service Provider. The company received the award in the Visa Service Provider Category at an award ceremony held at the Hotel Taj Palace in New Delhi, on 11 August 2015. Dr Mahesh Sharma (Minister of State (Independent Charge) for Tourism & Culture and Minister of State for Civil Aviation, Government of India) presented the award to Mr Vinay Malhotra (COO – South Asia and DVPC) who received the honour on behalf of VFS Global."
              },
              {
                title:
                  "Golden Peacock Environment Management Award: 17<sup>th</sup> World Congress on Environment Management, 2015.",
                date: "11 July 2015",
                desc:
                  "At the 17<sup>th</sup> World Congress on Environment Management held in New Delhi, India on 11 July 2015, VFS Global garnered the prestigious Golden Peacock Environment Management Award within the Services category, within which the company was chosen winner from among 22 applications.<br><br>\
			The Award was presented by Shri Prakash Javadekar (Hon’ble Minister of Environment & Forests and Climate Change (I/C), Government of India) in the presence of other distinguished luminaries like Lt Gen J S Ahluwalia, PVSM (Retd) (President, Institute of Directors, India), Mr Surjit K Chaudhary (Secretary, Department of Chemicals & Petrochemical, Ministry of Chemicals and Fertilisers, Government of India), Retd Hon Baroness Sandip Verma (Minister for International Development, Government of UK), Mr M N Venkatachaliah (Chairman, Institute of Directors and former Chief Justice of India), Mr Rakesh Garg (Secretary, Department Of Telecommunication, Ministry of Communication & IT, Government of India), and Mr S Chakraborty (Chief Executive, Innovative Financial Advisors).<br><br>\
			Environment-friendly practices and processes imbibed by the company, which included efforts such as optimal energy usage at the workplace, investment in carbon offsetting projects and various social outreach endeavours that comprised awareness campaigns and volunteering efforts, contributed to this win."
              },
              {
                title:
                  "International Business Excellence Award 2015 – Opportunity",
                desc:
                  "Towards 2020, a category that measures innovation, entrepreneurship and opportunism, VFS Global won the Opportunity Award for its innovative solution LIDPro™<sup>*</sup> (Location Independent Document Processing) that was developed in partnership with the Ministry of Foreign Affairs, Finland. This innovative solution enables remote visa processing that efficiently manages volumes, reduces costs and increases productivity. LIDPro™ also incorporates workflow management at the remote processing centres and allows different stakeholders to work on a standardised set of documents enabling faster and more accurate decision-making.<br><br>\
			The award was presented by Helen Nellis, Lord-Lieutenant of Bedfordshire, to Mr Srinarayan Sankaran, Head – Business Development, VFS Global.<br><br>\
			<sup>*</sup>Patent pending. Copyright 2012. All rights reserved by VFS Global"
              },
              {
                title:
                  "“World’s Leading Visa Services Provider” award: TnH Awards 2015 ceremony",
                date: "12 January 2015",
                desc:
                  "VFS Global leadership position as an outsourcing and technology services specialist for consular support was recognised by the Travel and Hospitality (TnH) magazine, on 12 January 2015 through the “World’s Leading Visa Services Provider” award. This ceremony, which was held in New Delhi, India, was attended by distinguished luminaries.<br><br>\
			The award was presented by Shri L K Advani (Chairman, BJP Parliamentary Party) to Mr Vinay Malhotra (COO – South Asia and DVPC) who received the honour on behalf of the company.<br><br>\
			At the same ceremony, Mr Zubin Karkaria (CEO, VFS Global Group) was felicitated with the “Pioneer of the Global Visa Services Industry” award."
              }
            ]
          },
          {
            year: "2014",
            content: [
              {
                title: "I.C.O.N.I.C IDC Insights Award 2014",
                date: "12 December 2014",
                desc:
                  "The I.C.O.N.I.C IDC Insights Award 2014 for Excellence in Customer Experience in the Retail and Service Sector was awarded to VFS Global. This recognition was presented on 12 December 2014 in Hyderabad, India. The award was presented by Mr Christopher Holmes Head - International Asia Pacific, IDC Insights, to Mr Dhiren Savla of VFS Global.<br><br>\
			The company’s adeptness with deploying technology for enriching customer-service and associated client government relationship stands acknowledged through this win."
              },
              {
                title: "DSCI Excellence Award 2014",
                desc:
                  "VFS Global has won the DSCI Excellence Award 2014 for security in Business Process Management (BPM) sector. This is the most prestigious award constituted by Data Security Council of India (DSCI) and independent body constituted for public advocacy on data protection & privacy, both in India and abroad."
              },
              {
                title:
                  "VFS Global’s Front Office Service (FOS) project garners Quality Management System (QMS) (ISO 9001:2008) certification",
                desc:
                  "The very first FOS project undertaken by VFS Global for the Municipal Corporation of Greater Mumbai (MCGM) was awarded the QMS (ISO 9001:2008) certification. Furthermore, the same has been earned within a year of launching this FOS operation, which speaks positively of the company’s emphasis on delivering world-class service quality with robust processes"
              },
              {
                title:
                  "Special Commendation for Golden Peacock Environment Management Award: 16<sup>th</sup> World Congress on Environment Management,2014",
                desc:
                  "During the 16<sup>th</sup> World Congress on Environment Management, VFS Global was felicitated with the Special Commendation for Golden Peacock Environment. The company has implemented environment-friendly work practices and processes among which optimising energy usage, offsetting 2672 tonnes of carbon dioxide through investment in carbon offsetting projects and social outreach endeavours including awareness drives and volunteering efforts, are the significant contributors to this recognition.<br><br>\
			VFS Global is the only company from the service industry winning a Special Commendation award among contemporaries who are top players in the manufacturing sector. This makes the honour momentous for the company."
              },
              {
                title:
                  "HP IT Innovation Award honour for Major IT transformation project, 2014",
                desc:
                  "The Major IT transformation project undertaken by VFS Global’s IT team, has been felicitated by Hewlett-Packard (HP) with the HP IT Innovation Award. With this, VFS Global’s move from being employers of a traditional IT model to proponents of an “as-a-service”, consumption-based IT model, stands acknowledged."
              },
              {
                title:
                  "ASD Gold Service Provider Award: Road and Transport Authority (RTA) annual gathering 2014",
                desc:
                  "The Roads and Transport Authority (RTA) one of the largest government departments in Dubai, recognised the services provided by VFS Global, with the esteemed ASD (Administration Service Department) Gold Service Provider Award. VFS Global’s par excellence service rendered in the handling of the RTA employees’ Schengen visa applications was hailed as being contributory to this win."
              },
              {
                title: "Al-Nasr Sports Club honour, 2014",
                desc:
                  "The winners of the GCC Club Cup, the Al-Nasr football team, presented a special letter thanking VFS Global for the exceptional services rendered in the handling of the players’ Schengen visa applications to countries like the UK and Australia, throughout all of last year. This felicitation took place at the VFS Global Visa Application Centre in Wafi Mall, Dubai."
              },
              {
                title:
                  "Service Provider of the Year award: Asian Voice Political and Public Life Awards",
                desc:
                  "VFS Global won the prestigious “Service Provider of the Year” award. The award, presented at the 8<sup>th</sup> annual Asian Voice Political and Public Life Awards held in 2014, recognises the company’s exemplary service to the public for visa and consular services on behalf of High Commission of India in the UK and its respective consulates."
              }
            ]
          },
          {
            year: "2013",
            content: [
              {
                title:
                  "Excellence in use of Information Technology: IMC IT Awards 2013",
                desc:
                  "VFS Global won the prestigious IMC (Indian Merchant Chamber) IT Award 2013 for the Excellence in use of Information Technology. The company has won this award under “End Users of IT in Large Enterprise Category” for implementation of SAP and enterprise portal using SharePoint across the globe. This further reaffirms the company’s leadership position in driving business excellence through the integration of information technology (IT) into its business operation."
              },
              {
                title:
                  "TAAI Appreciation Award for a Decade of Outstanding Service to Indian Travel & Tourism Industry: Travel Agents Association of India (TAAI) Annual Awards 2013",
                desc:
                  "VFS Global garnered the “TAAI Appreciation Award for a Decade of Outstanding Service to Indian Travel & Tourism Industry”, in recognition of the company’s leadership position in the outsourced visa and consular services market and its strong focus on offering innovative services that enhance the overall visa application experience for travel agents as well as visa applicants. The award also recognises the important role VFS Global plays in facilitating travel and tourism."
              },
              {
                title:
                  "Travel Entrepreneur of the Decade Award: the First International Convention of Enterprising Travel Agents Association (ETAA), 2013",
                desc:
                  "The Enterprising Travel Agents Association (ETAA), conferred the Travel Entrepreneur of the Decade Award on Mr Zubin Karkaria, CEO, VFS Global Group, to honour innovation, excellence and contribution to the industry, during its first international convention held in Dubai in 2013."
              },
              {
                title:
                  "Second Best Project of the year 2013 for LIDPro™<sup>*</sup> (previously ELVIS): the Project Management Association of Finland",
                desc:
                  "LIDPro™, a breakthrough innovation by VFS Global developed in partnership with and for the Ministry for Foreign Affairs, Finland, has been awarded the second best project of the year 2013 by the Project Management Association of Finland.<br><br>\
			LIDPro™ Program Manager Puittinen honoured as the Reformer of the Year 2013 in Finland.<br><br>\
			<sup>*</sup>Patent pending. Copyright 2012. All rights reserved by VFS Global"
              },
              {
                title:
                  "Best Network Security Implementation Award: Fortinet Network Security Awards, 2013",
                desc:
                  "VFS Global has been awarded the esteemed Best Network Security Implementation – 2013 award under the Fortinet Network Security Awards recognising the company’s leadership position in implementing the network security controls which are efficient and integrated with other networking controls across VFS Global."
              },
              {
                title:
                  "Dubai Quality Appreciation Award for the outstanding commitment to pursuing excellence in 2012: 18<sup>th</sup> Business Excellence Awards by the Dubai Department of Economic Development held in 2013 ",
                desc:
                  "VFS Global has received the Dubai Quality Appreciation Award recognising the company as a role model organisation for business excellence through adoption of good practices and thorough approaches that are deployed systematically and are continuously measured and reviewed. The award was presented in the appreciation category of Dubai Quality Award (DQA)."
              }
            ]
          },
          {
            year: "2012",
            content: [
              {
                title:
                  "TAAI Appreciation Award for Leadership in Innovation in the Visa Outsourcing Industry: Travel Agents Association of India (TAAI) Annual Awards 2012",
                desc:
                  "TAAI Appreciation Award for Leadership in Innovation in the Visa Outsourcing Industry has been awarded to VFS Global, acknowledging the company’s leadership position in the visa and consular services outsourcing market. The award is also a testament to the company’s strong focus on developing innovative solutions to enhance its service offerings for the benefit of its client governments and visa applicants."
              },
              {
                title:
                  "Capgemini Leadership Award for Innovation: NASSCOM India Leadership Forum 2012",
                desc:
                  "VFS Global won the coveted “Capgemini Leadership Award for Innovation” at the NASSCOM India Leadership Forum 2012, in recognition of effective usage of technology for providing services to the client governments."
              },
              {
                title:
                  "Safari India National Tourism Award as the “World’s largest, and a trusted, visa outsourcing company”: Safari India National Tourism Award 2012",
                desc:
                  "The Safari India National Tourism Award 2012 as the “World’s largest, and a trusted visa outsourcing company” was presented to VFS Global, which was organised by the Pacific Area Travel Writers Association (PATWA). This association is a leading travel writers’ organisation representing members from all over the world."
              },
              {
                title:
                  "Three Global Awards for Excellence in Quality Management and Leadership: World Quality Congress & Awards 2012",
                desc:
                  "VFS Global has successfully won three Global Awards for Excellence in Quality Management and Leadership including, the Quality Excellence Award for Best eBusiness, Supply Chain Innovation Award and Quality Leadership Award at the World Quality Congress & Awards 2012."
              },
              {
                title:
                  "Bloomberg - UTV Dream Employer of the Year 2012: World HRD Congress 2012",
                desc:
                  "VFS Global was awarded the “Bloomberg - UTV Dream Employer of the Year 2012” under the BPO / ITeS services category for best people practices, wide global reach, and excellent business model at the World HRD Congress 2012."
              },
              {
                title:
                  "QCI-DL Shah National Award on Economics for Quality 2012: Quality Council of India",
                desc:
                  "VFS Global was honoured with the “QCI-DL Shah National Awards on Economics for Quality 2012”, for efforts on reducing overrides in biometrics for the Home Office –UK Visas and Immigration (UKVI) Visa Application Centres (VACs), besides also effectively using technology for maintaining high standards and security of scanned biometrics."
              },
              {
                title:
                  "IQPC Best Process Improvement Project Award: International Quality and Productivity Centre (IQPC)",
                desc:
                  "VFS Global’s UK VAC in Kolkata, India, was awarded “Best Process Improvement Project” from International Quality and Productivity Centre (IQPC) in London in 2012.The project “Turn-Around-Time Reduction” won the award in acknowledgement of the business impact and scope of improvement exhibited to serve visa applicants."
              },
              {
                title: "Three CIO Awards: CIO100 Symposium and Awards 2012",
                desc:
                  "VFS Global has won the three most coveted awards for 2012 — CIO 100 Award, Networking Pioneer Special Award and CIO Hall of Fame Award at the CIO100 Symposium and Awards 2012."
              },
              {
                title: "Top 100 CISO Award: Top 100 CISO Awards 2012",
                desc:
                  "Top 100 CISO Award was presented at the Top 100 CISO Awards 2012, to recognise VFS Global for using information security technology in innovative ways to secure critical information of both its client governments and its business, in the most effective manner. This adeptness helped the company deliver business value, by creating competitive advantage, optimising business processes, enabling growth and improving relationships with customers."
              },
              {
                title: "Maximising Business Impact Through IT: EDGE Award",
                desc:
                  "VFS Global has earned admiration and the Edge award for ‘Maximising Business Impact Through IT’, consecutively for five years in 2009, 2010, 2011, 2012 and 2013."
              }
            ]
          },
          {
            year: "2010",
            content: [
              {
                title:
                  "Security Strategist Award for the ‘Best Information Security Initiative in India in 2008, and for ‘Leadership in IT Security’ in 2010",
                desc:
                  "VFS Global received the Security Strategist Award under the “Travel and Hospitality” category for the ‘Best Information Security Initiative in India’ in 2008 and for ‘Leadership in IT Security’ in 2010."
              },
              {
                title: "IT Governance and IT Security: ISACA Award",
                desc:
                  "VFS Global was chosen winner for the coveted Information Systems Audit and Control Association (ISACA) Award, which was conferred for its ‘IT Governance and IT Security’ in 2010."
              }
            ]
          },
          {
            year: "2009",
            content: [
              {
                title:
                  "Process Improvement in the services and transactions: Lean Six Sigma and Process Improvement Summit",
                desc:
                  "At the Lean Six Sigma and Process Improvement Summit 2009 in Orlando, USA, VFS Global received an award for ‘Process Improvement’ in the ‘services and transactions’ category."
              },
              {
                title: "iSixSigma Best Project: iSixSigma Summit",
                desc:
                  "In 2009, VFS Global was finalist in the ‘Best Project’ in Transactions’ category at the iSixSigma Summit held in Miami, USA."
              },
              {
                title: "Best Innovation Projects: Qimpro Convention",
                desc:
                  "In 2009, VFS Global was chosen finalist at the Qimpro Convention in Mumbai, India under the ‘Best Innovation Projects’ category."
              },
              {
                title:
                  "Excellence in Training and Global HR Strategy: Employer Branding Award",
                desc:
                  "VFS Global won the prestigious Employer Branding Award in 2009 for its ‘Excellence in Training’ and ‘Global HR Strategy’."
              },
              {
                title:
                  "Best HR Strategy and Training Excellence: Greentech HR Awards",
                desc:
                  "VFS Global received the prestigious Greentech HR Awards for ‘Best HR Strategy’ and ‘Training Excellence’ in 2010"
              }
            ]
          }
        ]
      },
      csr: {
        //number of csr news to show at start in page (currently showing 10 news as given here)
        show_at_start: 10,
        //number of csr news to load on click of "Load More" button (currently loading next 10 csr news on each click of button)
        load_next: 10,
        //each csr news have an image; below is given base path of folder which contains images of all csr news
        images_path: "../assets/images/news/csr/",
        content_details: [
          {
            title:
              "VFS Global teams across Europe organise fundraising activities for MIND",
            //image_desc can be object or array of object for multiple images.
            image_desc: [
              {
                image_name: "mind.jpg",
                desc:
                  "Team members across Europe organised fundraising activities for MIND, an organisation providing counseling support to individuals experiencing  mental health challenges."
              },
              {
                image_name: "mind1.jpg",
                desc:
                  "Employees in Berlin, Frankfurt, Leipzig, Munich, Hamburg and Bonn organised a Bake Sale, while the teams across London set-up Fun Fairs and a Photography Competition to raise funds for this cause."
              }
            ],
            //give show_on_latest: true if you want to show current csr news in "Latest News" section
            //Note: if multiple image is given then only first image will be shown in "Latest News" section
            show_on_latest: true
          },
          {
            title:
              "Russia Visa Application Centre team in Munich participates in World Neighbours Day",
            image_desc: {
              image_name: "world-neighbours-day.jpg",
              desc:
                "Employees of the Russian Visa Application Centre in Munich volunteered at a local event, ‘World Neighbours Day 2017’, which aimed at promoting the spirit of solidarity. The team worked as one with children to teach them how to finger knit and create colourful and creative decorations to adorn various outdoor features."
            }
          },
          {
            title:
              "VFS Global’s Greece team champions ‘The Smile of the Child’",
            image_desc: {
              image_name: "children-smile.jpg",
              desc:
                "Russian Visa Application Centres in Greece have installed collection boxes in their premises to raise funds for ‘The Smile of the Child’ organisation, a non-profit voluntary establishment that supports children and families in need."
            }
          },
          {
            title:
              "VFS Global employees from Kolkata, India, visit orphanage and old age home",
            image_desc: {
              image_name: "old-age-home.jpg",
              desc:
                "Employees of the Kolkata team in India visited the orphanage and old age home, “Trinity Society for Social and Health Research”, on 29 July 2017, and donated food items and utilities. The team also conducted recreational activities for the children at the centre."
            }
          },
          {
            title: "Team Indonesia participates in tree donation drive",
            image_desc: {
              image_name: "tree-donation.jpg",
              desc:
                "On 27 October 2017, VFS Global’s Indonesia team ran a Go-Green campaign by donating 200 trees to Taman Safari Indonesia (TSI). The TSI Management commended VFS Global’s efforts towards environmental conservation of the Taman Safari Park."
            }
          },
          {
            title: "Berlin team commemorates Soviet soldiers",
            image_desc: {
              image_name: "soviet-soldiers.jpg",
              desc:
                "Employees of the Russia Visa Application Centre in Berlin participated in a cleaning and refining drive of the territory of the Burial of Soviet soldiers in Potsdam, Germany. As part of this activity, the team repainted and refurbished several of the monuments and graves. Evgenii Aleshin, the Head of the Military-Memorial Section, the Russian Embassy in Berlin, also joined the team in their initiative, and commended them on their effort."
            }
          },
          {
            title:
              "The Nepal team visits Old Age Home to celebrate World Environment Day",
            image_desc: {
              image_name: "world-envi-day.jpg",
              desc:
                "On 4 June 2017, VFS Global’s Nepal team visited a local old age home in Kathmandu. The team sponsored lunch for the day, distributed refreshments and gifts, and spent some valuable time with the elderly residents. The initiative was organised to venerate World Environment Day."
            }
          },
          {
            title:
              "VFS Global’s team members from the Philippines run for humanity",
            image_desc: {
              image_name: "run-for-huminity.jpg",
              desc:
                "VFS Global Philippines participated in the ‘Run for Humanity’ fun run of the Philippine Red Cross organisation in celebration of the 68<sup>th</sup> anniversary for International Humanitarian Law. The fun run was held on 12 August 2017. A total of 24 employees participated in the programme."
            }
          },
          {
            title: "The Rio de Janeiro team cleans up a local park",
            image_desc: {
              image_name: "local-park.jpg",
              desc:
                "The team from Rio de Janeiro ran a clean-up drive at the local Passeio Park, located close to the Visa Application Centre."
            }
          },
          {
            title: "VFS Global’s Sao Paulo team gives back to nature",
            image_desc: {
              image_name: "back-to-nature.jpg",
              desc:
                "The team from Sao Paulo, in collaboration with the local government, participated in the Reforestation of Neighborhoods drive, contributing to improvement of air quality in the city."
            }
          },
          {
            title: "Teams across India organise blood donation camps",
            image_desc: {
              image_name: "blood-camp.jpg",
              desc:
                "VFS Global teams across the cities of Mumbai, Pune, Ahmedabad and New Delhi, organised Blood Donation Camps in July 2017. Employees contributed towards this noble cause with overwhelming drive and commitment, which will help save many lives."
            }
          },
          {
            title:
              "Teams across 12 cities in North America lend a Helping Hand",
            image_desc: {
              image_name: "helping-hand.jpg",
              desc:
                "VFS Global’s UKVI Premium Application Centre teams across 12 cities in North America embarked on a mission to prepare meals for the homeless as part of their ‘Helping Hand’ initiative. The Canada team in Toronto took to planting 100 trees in their local park as their contribution to environmental restoration."
            }
          },
          {
            title: "VFS Global’s Colombia team donate solar water purifiers",
            image_desc: {
              image_name: "solar-water-purifier.jpg",
              desc:
                "H.E. Mrs Marie Andersson de Frutos, Ambassador of Sweden to Colombia, Ecuador & Venezuela (second from right), along with fellow officials from the Embassy of Sweden in Colombia, as well as a representative of VFS Global, recently participated in a donation drive in the country. VFS Global, through the Embassy of Sweden in Colombia, donated solar water purifiers to Defensa Civil Colombiana, with an aim to help several affected earlier this year during the floods in the interiors of Colombia.  These water purifiers can also be used in the event of any future natural disasters in the country."
            }
          },
          {
            title: "The South Korea team embarks on a clean-up drive in Seoul",
            image_desc: {
              image_name: "clean-up.jpg",
              desc:
                "The team in South Korea participated in a clean-up drive in Seoul.  The members each carried plastic bags to collect garbage from a local park, and cycled around the area for the initiative. The team also had lunch together, and gifted each other handkerchiefs as a message to reduce the use of disposable products."
            }
          },
          {
            title:
              "VFS Global’s offices in Kazakhstan celebrate World Health Day",
            image_desc: {
              image_name: "world-helth-day.jpg",
              desc:
                "The Visa Application Centres in Almaty supported World Health Day and conducted exercises for the staff in April 2017. In addition, the Joint Visa Application Centre in Almaty arranged an auction to “Help to four-legged friends” among the employees of the office. All collected funds from the auction were donated to the sheltered “CatDog” for the treatment of homeless animals. The staff also carried out a social activity for the Veterans of the 2<sup>nd</sup> World War."
            }
          },
          {
            title:
              "VFS Global’s Jakarta team organises donation drive for local orphanage",
            image_desc: {
              image_name: "organise-donation.jpg",
              desc:
                "Team members in Jakarta organised and participated in a drive to collect clothes and toys to donate to the local orphanage, Rumah Yatim Ad-Diniyah. The team also donated two water purifying systems as part of the initiative."
            }
          },
          {
            title: "Mumbai employees take a stroll through history",
            image_desc: {
              image_name: "stroll-through-history.jpg",
              desc:
                "In February 2017, a Heritage Walk was held in Mumbai, which covered heritage buildings in the city, most built circa 1850, such as Trafford House, Gulestan (LIC Building), The Public Works Office, Central Telegraph Office, Somaiya Bhawan, Mulla House, Ismail Building, and the Convention Hall at Mumbai University Campus, to name a few.The event lasted four hours, followed by brunch at the IMC Building at Churchgate. 75 people participated in the walk, including VFS Global, and the Consulates of Canada, Korea, Thailand, Turkey, Germany, Hungary, Norway, Vietnam, China, Mauritius, Switzerland and Spain."
            }
          },
          {
            title:
              "VFS Global unveils Sustainability Roadmap - Comprehensive plan addresses company’s environmental, social and governance responsibilities",
            image_desc: [
              {
                image_name: "bio-digester-project.jpg",
                desc:
                  "Ongoing work at the Kolar Bio-digester Project in India supported by VFS Global"
              },
              {
                image_name: "bio-digester-project1.jpg",
                desc:
                  "Organic farm fertilized with biogas spent slurry (product of Kolar Biodigester Project in India supported by VFS Global) – leads to increased crop yield and is good for health."
              }
            ]
          },
          {
            title:
              "Mumbai employees celebrate Christmas with Akanksha Foundation children",
            image_desc: {
              image_name: "celebrate-christmas.jpg",
              desc:
                "VFS Global Mumbai team interacting and playing games with the kids of Shindewadi Public School"
            }
          },
          {
            title:
              "Bangalore team members spread joy at a home for orphans and the destitute",
            image_desc: [
              {
                image_name: "spread-joy.jpg",
                desc: "Children sharing their happiness by singing songs"
              },
              {
                image_name: "spread-joy1.jpg",
                desc:
                  "VFS Global Bangalore employees interacting with the children at the home for the underprivileged"
              }
            ]
          },
          {
            title:
              "VFS Global Nepal celebrates Christmas with the children of ‘Heart Beat Centre’",
            image_desc: [
              {
                image_name: "heart-beat-centre.jpg",
                desc:
                  "VFS Global Nepal employees serve food to the kids of Heart Beat Centre, Nepal"
              },
              {
                image_name: "heart-beat-centre1.jpg",
                desc:
                  "VFS Global Nepal team celebrates Christmas at the Heart Beat Centre orphanage"
              }
            ]
          },
          {
            title:
              "VFS Global employees run to spread awareness about women’s health",
            image_desc: {
              image_name: "biggest-womens-marathon.jpg",
              desc:
                "Employees participate in India’s biggest women’s marathon - Pinkathon 2016"
            }
          }
        ]
      }
    },

    //Navigation of entire website is given here
    //in future if requirement comes to create site map then we can use this data to create that
    navigation_page_details: (function () {
      //Note: Pl. read below for detailed info about child/sub navigation
      //if navigation menu item has child_nav / hidden_child_nav / sub_nav then link items inside it will be used to create breadcrumb and even for setting page title.
      //meaning of each key is given below
      //child_nav: (array of link item object) it will be used as dropdown menu. e.g. See Governments > About
      //hidden_child_nav: (array of link item object) it will not be shown in UI but will be used for breadcrumb and page title
      //sub_nav: (object with key and value as array of link item object; also key must be unique in entire navigation array) it will be used to show menu in UI on different location e.g. give vue component <menu-nav :content="all_navigation.sub_nav_key_name" /> //for root navigation i.e. Individuals and Governments use 'root_nav' key means <menu-nav :content="all_navigation.root_nav" />

      //all the comman navigation of governments section are given here; which will be used in returning main navigation array
      var governments = {
        about: {
          html: "About",
          href: "../governments/about.html",
          child_nav: [
            {
              html: "About VFS Global",
              href: "../governments/about.html"
            },
            {
              id: "executive_board", //this id will be used as key that has data about executive board that will be used in vue component; see master-board-member vue component in vue-app.js
              html: "Executive Board",
              href: "../governments/executive-board.html",
              images_path: "../assets/images/about/executive-board/",
              //this style will be used for all the executive board images in executive-board.html page
              image_style: {
                "background-position": "top"
              },
              //html of link to be displayed for each board member box
              link_html: "View profile",
              hidden_child_nav: [
                {
                  html: "Zubin Jal Karkaria",
                  href: "../governments/board-member-zubin-jal-karkaria.html",
                  image_name: "zubin-jal-karkaria.jpg",
                  small_heading: "Chief Executive Officer"
                },
                {
                  html: "Olivier de Canson",
                  href: "../governments/board-member-olivier-de-canson.html",
                  image_name: "olivier-de-canson.jpg",
                  small_heading: "Chief Financial Officer"
                },
                {
                  html: "Bernard Martyris",
                  href: "../governments/board-member-bernard-martyris.html",
                  image_name: "bernard-martyris.jpg",
                  small_heading: "Chief of Human Resources"
                },
                {
                  html: "Dhiren Savla",
                  href: "../governments/board-member-dhiren-savla.html",
                  image_name: "dhiren-savla.jpg",
                  small_heading: "Chief Information Officer"
                },
                {
                  html: "Chris Dix",
                  href: "../governments/board-member-chris-dix.html",
                  image_name: "chris-dix.jpg",
                  small_heading: "Head of Business Development"
                },
                {
                  html: "Arnaud de La Chapelle",
                  href:
                    "../governments/board-member-arnaud-de-la-chapelle.html",
                  image_name: "arnaud-de-la-chapelle.jpg",
                  small_heading: "Head of Identity & Citizen Services"
                },
                {
                  html: "Vinay Malhotra",
                  href: "../governments/board-member-vinay-malhotra.html",
                  image_name: "vinay-malhotra.jpg",
                  small_heading:
                    "Regional Group Chief Operating Officer - Middle East, South Asia & China"
                },
                {
                  html: "Jiten Vyas",
                  href: "../governments/board-member-jiten-vyas.html",
                  image_name: "jiten-vyas.jpg",
                  small_heading:
                    "Regional Group Chief Operating Officer - Africa, CIS and Eastern Europe, Europe, Americas, and Australasia"
                }
              ]
            },
            {
              html: "Milestones",
              href: "../general/milestones.html"
            },
            {
              html: "Corporate Social Responsibility",
              href:
                "../governments/about-corporate-social-responsibility.html"
            }
          ]
        },
        news_sections: [
          {
            html: "Latest News",
            href: "../governments/latest-news.html"
          },
          {
            //provided key from all_content_details to be used to show content in page; code for content creation is given in vue-app.js. just find 'content_details_key' in vue-app.js
            content_details_key: "media_releases",
            html: "Media Releases",
            href: "../governments/media-releases.html"
          },
          {
            content_details_key: "news_coverage",
            html: "News Coverage",
            href: "../governments/news-coverage.html"
          },
          {
            content_details_key: "events",
            html: "Events",
            href: "../governments/events.html"
          },
          {
            content_details_key: "awards",
            html: "Awards",
            href: "../governments/awards.html"
          },
          {
            content_details_key: "csr",
            html: "Social Responsibility",
            href: "../governments/news-corporate-social-responsibility.html"
          }
        ],
        solutions_services: [
          {
            html: "Location Independent Document Processing (LIDPro™)",
            href: "../governments/solutions-lidpro.html",
            //this icon will be used for solution (icon prefix will be taken from Governments > Solutions navigation menu item; search solutions_services in this file)
            icon_name: "lidpro",
            image_name: "location-independent-document-processing.jpg",
            //footer_index is the order at which the current link will be shown in footer; order will be starts from 0
            footer_index: 12
          },
          {
            html: "Self-Service Kiosk",
            href: "../governments/solutions-self-service-kiosk.html",
            icon_name: "self-service-kiosk",
            image_name: "self-service-kiosk.jpg",
            footer_index: 0
          },
          {
            html: "Visa at Your Doorstep",
            href: "../governments/solutions-visa-at-door-step.html",
            icon_name: "visa-at-doorstep",
            image_name: "visa-at-your-doorstep.jpg",
            footer_index: 1
          },
          {
            html: "Mobile Visa Application Centre",
            href: "../governments/solutions-mobile-visa.html",
            icon_name: "mobile-visa-application-centre",
            image_name: "mobile-visa-application-centre.jpg",
            footer_index: 2
          },
          {
            html: "Verification and Attestation Services",
            href: "../governments/solutions-verification-attestation.html",
            icon_name: "verification-attestation-services",
            image_name: "verification-and-attestation-service.jpg",
            footer_index: 3
          },
          {
            html: "Resident Permit & Enrolment",
            main_html: "Resident Permit & Enrolment – Migration Services",
            href: "../governments/solutions-resident-permit-enrolment.html",
            icon_name: "resident-permit-enrolment",
            image_name: "resident-permit-enrolment.jpg",
            footer_index: 4
          },
          {
            html: "Integrated Citizen Services",
            href: "../governments/solutions-integrated-citizen-services.html",
            icon_name: "integrated-citizen-services",
            image_name: "integrated-citizen-services.jpg",
            footer_index: 5
          },
          {
            html: "E-Visa Solutions",
            href: "../governments/solutions-e-visa.html",
            icon_name: "electronic-visa-waiver-service",
            image_name: "electronic-visa-waiver-service.jpg",
            footer_index: 6
          },
          {
            html: "Form-Filling Assistance Services",
            href: "../governments/solutions-form-filling-assistance.html",
            icon_name: "form-filling-assistance",
            image_name: "form-filling-assist-services.jpg",
            footer_index: 7
          },
          {
            html: "Online Language Solutions",
            href: "../governments/solutions-online-language-solutions.html",
            icon_name: "translation",
            image_name: "online-language-solutions.jpg",
            footer_index: 8
          },
          {
            html: "Tourism and Trade Support Services",
            href: "../governments/solutions-tourism-trade-support.html",
            icon_name: "tourism-trade-support-services",
            image_name: "tourism-trade-support-services.jpg",
            footer_index: 9
          },
          {
            html: "Biometric Enrolment",
            href: "../governments/solutions-biometric-enrolment.html",
            icon_name: "biometric-enrolment",
            image_name: "biometric-enrolment.jpg",
            footer_index: 10
          },
          {
            html: "Front-End Operations and Centres",
            href: "../governments/solutions-frontend-operations.html",
            icon_name: "front-end-operations-centres",
            image_name: "front-end-service.jpg",
            footer_index: 11
          }
        ]
      },
        general_extra_links = [
          {
            html: "Disclaimer",
            href: "../general/disclaimer.html"
          },
          {
            html: "Privacy Notice",
            href: "../general/privacy-notice.html"
          },
          {
            html: "Cookie Policy",
            href: "../general/cookie-policy.html"
          },
          {
            html: "Terms and Conditions",
            href: "../general/terms-and-conditions.html"
          }
        ],
        general_hidden_links = [
          {
            html: "Certification and Accreditation",
            href: "../general/certification-and-accreditation.html",
            //this class will be applied to menu li (for more info about this class, go to Documentation > Style)
            class_name: "show_from_small_ipad"
          }
        ];

      return [
        {
          html: "For Individuals",
          href: "../individuals/index.html",
          sub_nav: {
            //this navigation is shown in individuals pages below the logo
            main_sub_nav: [
              {
                html: "Home",
                href: "../individuals/index.html",
                //give title_prefix where you dont want to use default_title_prefix 
                title_prefix: "Welcome to VFS Global"
              },
              {
                html: "About",
                href: "../individuals/about.html",
                hidden_child_nav: [
                  {
                    html: "Milestones",
                    href: "../general/milestones.html"
                  }
                ]
              },
              {
                html: "Footprint",
                href: "../general/footprint.html"
              },
              {
                //Note: convention for page name
                //For blog section page give page name like blog-(sub-section-name).html e.g. blog-featured.html, blog-visa-application-guide.html, etc.
                //For articles (posts) give page name like article-(article-name).html e.g. article-simple-visa-tips-for-a-great-start.html, article-setting-up-your-finances-abroad.html, etc.

                id: "blog", //this id will be used as key that has data about blog that will be used in vue component; see master-non-featured-blog-section, master-article-page vue component in vue-app.js
                html: "Blog",
                href: "../individuals/blog-featured.html",
                //each blog posts must have an image; below is given base path of folder which contains images of all posts.
                //Note: path of image will be images_path/current section's image_folder_name/current resolution_folder_name/image_name e.g. to show featured image in individuals home page ../assets/images/blog/featured/large/The-Northern-Ireland-you.jpg
                images_path: "../assets/images/blog/",
                //html of link for all posts shown in boxes (currently displaying "Continue reading" as given here)
                link_html: "Continue reading",
                //resolution folder name will be used as per section like
                //large - for individuals home page
                //extra-large - for top banner in blog featured page; for top banner in blog sub section page e.g. visa application guide; for top banner in article page
                //medium - for boxes
                resolution_folder_names: {
                  home: "large",
                  featured_top: "extra-large",
                  section_top: "extra-large",
                  article_top: "extra-large",
                  other_posts: "medium"
                },
                //give array of page links where you want to show blog data in pages other than blog pages (pages which doesn't come inside this object)
                show_data_in_other_pages: ["../individuals/index.html"],
                sub_nav: {
                  //this navigation is shown in individuals > blog sub section pages
                  inner_sub_nav: [
                    {
                      html: "Featured",
                      href: "../individuals/blog-featured.html",
                      //blog sub section image folder name 
                      image_folder_name: "featured",
                      hidden_child_nav: [
                        {
                          html:
                            "The Northern Ireland you GoT to see",
                          href:
                            "../individuals/article-the-northern-ireland-you-got-to-see.html",
                          image_name: "The-Northern-Ireland-you.jpg",
                          //give show_on_section_top: true if you want to show current post on top banner in blog sub section page
                          show_on_section_top: true,
                          //give show_on_featured: true if you want to show current post on top banner in featured section of blog
                          show_on_featured: true,
                          //give show_on_home: true if you want to show current post in Individuals Home Page
                          show_on_home: true
                        },
                      ]
                    },
                    {
                      //data_key is used to display blog's featured sub section articles (see blog-featured.html)
                      data_key: "visa_application_guide",
                      html: "Guide to visa application",
                      href: "../individuals/blog-visa-application-guide.html",
                      image_folder_name: "visa-application-guide",
                      hidden_child_nav: [
                        {
                          html:
                            "Checklist for studying in Canada",
                          href:
                            "../individuals/article-checklist-for-studying-in-canada.html",
                           
                          image_name: "checklist-for-study-in-canada.jpg",
                          show_on_section_top: true,
                          show_on_featured: true,
                          show_on_home: true
                        },
                        {
                          html:
                            "Checklist for studying in the US",
                          href:
                            "../individuals/article-checklist-for-studying-in-the-US.html",
                           
                          image_name: "checklist-for-study.jpg",
                          show_on_featured: true,
                        },
                        {
                          html:
                            "Checklist before moving overseas",
                          href:
                            "../individuals/article-checklist-before-moving-overseas.html",
                           
                          image_name: "checklist-before-moving-overseas.jpg",
                          show_on_featured: true,
                        },
                        {
                          html:
                            "Funding a degree overseas",
                          href:
                            "../individuals/article-funding-a-degree-overseas.html",
                            image_style: {
                              "background-position": "bottom"
                            },
                          image_name: "study-abroad.jpg"
                        },
                        {
                          html:
                            "Points to remember before  sending money abroad",
                          href:
                            "../individuals/article-points-to-remember-before-sending-money-abroad.html",
                          image_name: "points-to-remember.jpg",
                          //this is style object that will be given to image of article whereever displayed, since image is diplayed as background-image instead of img tag we can use background-position that will change position of image
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html:
                            "5 simple visa tips for a great start to your globetrotting",
                          href:
                            "../individuals/article-simple-visa-tips-for-a-great-start.html",
                          image_name: "Five-simple-visa-tips.jpg"
                        },
                        
                        {
                          html:
                            "5 mistakes to avoid in your visa application",
                          href:
                            "../individuals/article-mistakes-to-avoid-in-your-visa-application.html",
                          image_name: "Mistakes-to-avoid.jpg",
                          //image_class is used to give class for top banner, big class increases height of banner
                          image_class: "big"
                        },
                        {
                          html:
                            "Say hello to the artificial intelligence assistant ViVA!",
                          href:
                            "../individuals/article-say-hello-to-the-artificial-intelligence-assistant-ViVA.html",
                          image_name: "Say-Hello-to-the-artificial.jpg",
                          image_style: {
                            "background-position": "top"
                          },
                        },
                        {
                          html:
                            "Top Tips: Setting up your finances abroad",
                          href:
                            "../individuals/article-setting-up-your-finances-abroad.html",
                          image_name: "tip-top-setting-finance-in-abroad.jpg",
                          image_style: {
                            "background-position": "bottom"
                          }
                        },
                        {
                          html:
                            "Special services for a seamless visa application experience",
                          href:
                            "../individuals/article-Special-Services-for-a-Seamless-visa-application-experience.html",
                          image_name: "Special-Services-for-a-Seamless.jpg"
                        },
                        {
                          html:
                            "Technology transforms the UK Visa Service",
                          href:
                            "../individuals/article-technology-transform-the-uk-visa-service.html",
                          image_name: "Technology-Transforms-UK-Visa-Service.jpg"
                        },
                        {
                          html:
                            "Got questions?",
                          href:
                            "../individuals/article-got-questions.html",
                          image_name: "Got-Questions.jpg"
                        },
                        {
                          html:
                            "Home is where the easy visa application is!",
                          href:
                            "../individuals/article-home-is-where-the-easy-visa-application-is.html",
                          image_name: "Home-is-Where-Easy-Visa-Application-Is.jpg"
                        },
                        {
                          html:
                            "Experience the ultimate in convenience and personalisation ",
                          href:
                            "../individuals/article-experience-the-ultimate-convenience-and-personalisation.html",
                          image_style: {
                            "background-position": "top"
                          },
                          image_name: "Ultimate-in-Convenience-and-Personalisation.jpg"
                        },
                        {
                          html:
                            "Your top visa queries answered here!",
                          href:
                            "../individuals/article-your-top-visa-queries.html",
                          image_name: "Your-Top-Visa-Queries-Answered-Here.jpg"
                        },
                        {
                          html:
                            "VFS Global launches ViVA – First ever visa services Chatbot",
                          href:
                            "../individuals/article-vfs-global-launches-viva.html",
                          image_name: "vfs-global-launches-viva.jpg"
                        },
                        {
                          html: "Don’t fall for visa fraud, be cautious",
                          href:
                            "../individuals/article-dont-fall-for-visa-fraud.html",
                          image_name: "dont-fall-for-fraud-be-cautious.jpg"
                        },
                        {
                          html: "Enhance your experience",
                          href:
                            "../individuals/article-enhance-your-experience.html",
                          image_name: "enhance-your-experience.jpg"
                        },
                        {
                          html:
                            "6 Things to remember for your visa application",
                          href:
                            "../individuals/article-things-to-remember-for-your-visa-application.html",
                          image_name:
                            "things-to-remember-for-your-visa-application.jpg"
                        },
                        {
                          html: "Travelling abroad? spend better!",
                          href:
                            "../individuals/article-travelling-abroad-spend-better.html",
                          image_name: "travelling-abroad-spend-better.jpg"
                        },
                        {
                          html:
                            "Great visa services with a brand new look and feel",
                          href:
                            "../individuals/article-great-visa-service.html",
                          image_name: "great-visa-service.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html:
                            "Book your UAE Visa while on&#8209;the&#8209;go",
                          href:
                            "../individuals/article-book-your-uae-visa-guide.html",
                          image_name: "dubai-banner.jpg"
                        },
                        {
                          html: "Going abroad to study?",
                          href:
                            "../individuals/article-going-abroad-study-guide.html",
                          image_name: "going-abroad.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html:
                            "The VFS Global Guide to Applying for a UK Visa",
                          href: "../individuals/article-uk-visa-guide.html",
                          image_name: "apply-uk-visa.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        }
                      ]
                    },
                    {
                      data_key: "people_places",
                      html: "People & Places",
                      href: "../individuals/blog-people-places.html",
                      image_folder_name: "people-places",
                      hidden_child_nav: [
                        {
                          html:
                            "Event Planner for June, July & August 2019",
                          href:
                            "../individuals/article-event-planner-for-june-aug.html",
                          image_name: "event-plan-jun-aug.jpg",
                          image_class: "big",
                          show_on_section_top: true,
                          show_on_featured: true
                        },
                        {
                          html:
                            "Slovakia - blessed with nature’s bounty!",
                          href:
                            "../individuals/article-slovakia-blessed-with-nature-bounty.html",
                          image_name: "Slovakia-blessed-with-nature-bounty.jpg",
                          show_on_featured: true,
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html:
                            "Scintillating Slovakia",
                          href:
                            "../individuals/article-scintillating-slovakia.html",
                          image_name: "Scintillating-Slovakia.jpg",
                          show_on_featured: true
                        },
                        {
                          html:
                            "A date with history in London",
                          href:
                            "../individuals/article-a-date-with-history-in-London.html",
                          image_name: "date-with-history-in-London.jpg",
                        },
                        {
                          html:
                            "72 hours in Nice",
                          href:
                            "../individuals/article-72-hours-in-nice.html",
                          image_name: "72-hours-in-nice.jpg",
                        },
                        {
                          html:
                            "High on wine!",
                          href:
                            "../individuals/article-high-on-wine.html",
                          image_name: "High-on-wine.jpg",
                        },
                        {
                          html:
                            "Off the beaten path in the USA",
                          href:
                            "../individuals/article-off-the-beaten-path-in-the-USA.html",
                          image_name: "off-the-beaten-path.jpg",
                        },
                        {
                          html:
                            "Filming locations, A La Bollywood style",
                          href:
                            "../individuals/article-filming-locations-bollywood-style.html",
                          image_name: "filming-locations-bollywood-style.jpg",
                        },

                        {
                          html:
                            "New Thai eVOA service will enhance the Thailand experience for travellers",
                          href:
                            "../individuals/article-new-thaieveo-service-will-enhance.html",
                          image_name: "The-Grand-Palace.jpg",
                        },
                        {
                          html:
                            "Event planner for April & May 2019",
                          href:
                            "../individuals/article-event-planner-for-apr-may.html",
                          image_name: "event-plan-apr.jpg"
                        },
                        {
                          html:
                            "A Master Blaster holiday",
                          href:
                            "../individuals/article-master-blaster-holiday.html",
                          image_name: "Master-Blaster-Holiday.jpg"
                        },
                        {
                          html:
                            "Prepare to Get Bowled Over",
                          href:
                            "../individuals/article-Prepare-to-Get-Bowled-Over.html",
                          image_name: "Prepare-to-Get-Bowled-Over.jpg"
                        },
                        {
                          html:
                            "Who are your favourites?",
                          href:
                            "../individuals/article-who-are-your-favourites.html",
                          image_name: "Who-Are-Your-Favourites.jpg"
                        },
                        {
                          html:
                            "For a feel good vibe",
                          href:
                            "../individuals/article-for-a-feel-good-vibe.html",
                          image_name: "For-a-Feel-Good-Vibe.jpg"
                        },
                        {
                          html:
                            "A Roman love affair",
                          href:
                            "../individuals/article-A-Roman-love-affair.html",
                          image_name: "Roman-Love-Affair.jpg"
                        },
                        {
                          html:
                            "Malaysian musings",
                          href:
                            "../individuals/article-malaysian-musings.html",
                          image_name: "Malaysian-Musings.jpg"
                        },
                        {
                          html:
                            "Lebanese landscapes",
                          href:
                            "../individuals/article-lebanese-landscapes.html",
                          image_name: "Lebanese-Landscapes.jpg"
                        },
                        {

                          html:
                            "Latvia's unique attractions are drawing travellers",
                          href:
                            "../individuals/article-latvia-unique-attraction.html",
                          image_name: "Latvia-Unique-Attraction.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html:
                            "Event Planner for February & March 2019",
                          href:
                            "../individuals/article-event-planner-for-feb-mar.html",
                          image_name: "event-plan-feb.jpg"
                        },
                        {
                          html:
                            "Latvia, a Baltic wonderland",
                          href:
                            "../individuals/article-Latvia-Baltic-wonderland.html",
                          image_name: "Baltic-Wonderland.jpg"
                        },
                        {
                          html:
                            "Switzerland should be on every traveller’s list",
                          href:
                            "../individuals/article-switzerland-should-be-every-travellers.html",
                          image_name: "Switzerland-Should-be.jpg"
                        },
                        {
                          html:
                            "Must Dos in Switzerland from Ranveer Singh",
                          href:
                            "../individuals/article-must-dos-in-switzerland.html",
                          image_name: "Ranveer-Recommends.jpg"
                        },
                        {
                          html:
                            "Technology & Innovation",
                          href:
                            "../individuals/article-technology-and-innovation.html",
                          image_name: "Technology-and-Innovation.jpg"
                        },
                        {
                          html:
                            "Asian and British hospitality at its best in Dubai ",
                          href:
                            "../individuals/article-asian-and-british-hospitality.html",
                          image_name: "Anantara-The-Palm-Dubai-Resort.jpg",
                          image_class: "big"
                        },
                        {
                          html:
                            "Experience China in true luxury",
                          href:
                            "../individuals/article-experience-china-in-luxury.html",
                          image_name: "Experience-China-in-True-Luxury.jpg"
                        },
                        {
                          html:
                            "The ever-enticing Ireland",
                          href:
                            "../individuals/article-the-ever-enticing-Ireland.html",
                          image_name: "The-Ever-Enticing-Ireland.jpg",
                          image_class: "big"
                        },
                        {
                          html:
                            "72 hours in Cape Town",
                          href:
                            "../individuals/article-72-hours-in-cape-town.html",
                          image_name: "72-Hours-in-Cape-Town.jpg"
                        },
                        {
                          html:
                            "Happy holidays on Kangaroo Island",
                          href:
                            "../individuals/article-happy-holidays-on-Kangaroo-Island.html",
                          image_name: "Happy-Holidays-on-Kangaroo-Island.jpg"
                        },
                        {
                          html:
                            "Yas Island’s entertainment experiences are unrivalled",
                          href:
                            "../individuals/article-yas-island-entertainment-experiences.html",
                          image_name: "yas-island-unrivalled.jpg",
                          image_style: {
                            "background-position": "bottom"
                          }
                        },
                        {
                          html:
                            "Yas Islands – A one-of-a-kind holiday destination",
                          href:
                            "../individuals/article-say-yas-to-this-holiday.html",
                          image_name: "say-yas-to-this-holiday.jpg"
                        },
                        {
                          html: "Merry Christmas to all!",
                          href:
                            "../individuals/article-merry-christmas-to-all.html",
                          image_name: "merry-christmas-to-all.jpg"
                        },
                        {
                          html: "Event planner for November and December 2018",
                          href: "../individuals/article-event-planner.html",
                          image_name: "event-planner-dec.jpg"
                        },
                        {
                          html: "Bucket list 2019",
                          href: "../individuals/article-Bucket-list-2019.html",
                          image_name: "bucket-list-2019.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "Zlin – Home of Bata",
                          href: "../individuals/article-zlin-home-of-Bata.html",
                          image_name: "zlin-home-of-bata.jpg",
                          image_style: {
                            "background-position": "top"
                          },
                          image_class: "big"
                        },
                        {
                          html: "Singapore – There is something for everyone!",
                          href:
                            "../individuals/article-singapore-there-is-something.html",
                          image_name: "singapore-something-for-everyone.jpg"
                        },
                        {
                          html: "Making UK Visa services more digital",
                          href:
                            "../individuals/article-making-uk-visa-services-more-digital.html",
                          image_name: "interview-with-david-ratcliffe.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "Winter break for the soul",
                          href:
                            "../individuals/article-winter-break-for-the-soul.html",
                          image_name: "winter-break-for-the-soul.jpg"
                        },
                        {
                          html: "Island hopping in Thailand",
                          href:
                            "../individuals/article-island-hopping-in-thailand.html",
                          image_name: "island-hopping-in-thailand.jpg"
                        },
                        {
                          html: "The hidden beauty of the Caucasus",
                          href:
                            "../individuals/article-the-hidden-beauty-of-the-caucasus.html",
                          image_name: "the-hidden-beauty-of-the-caucasus.jpg",
                          image_style: {
                            "background-position": "center"
                          }
                        },
                        {
                          html: "Where the past meets the future",
                          href:
                            "../individuals/article-where-the-past-meets-the-future.html",
                          image_name: "the-past-meets-the-future.jpg"
                        },
                        {
                          html: "Paradise Beckons",
                          href: "../individuals/article-paradise-beckons.html",
                          image_name: "paradise-beckons.jpg"
                        },
                        {
                          html: "72 Hours in Beijing",
                          href:
                            "../individuals/article-72-hours-in-beijing.html",
                          image_name: "72-hours-in-beijing.jpg"
                        },
                        {
                          html: "Call of the Alps",
                          href: "../individuals/article-call-of-the-alps.html",
                          image_name: "call-of-the-alps.jpg"
                        },
                        {
                          html: "A Swiss Escapade",
                          href: "../individuals/article-swiss-escapade.html",
                          image_name: "swiss.jpg",
                          image_style: {
                            "background-position": "center"
                          }
                        },
                        {
                          html: "An exquisite & serene experience",
                          href:
                            "../individuals/article-exquisite-serene-experience.html",
                          image_name: "serene-experience.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "Fly by Beirut",
                          href: "../individuals/article-fly-by-beirut.html",
                          image_name: "beirut.jpg"
                        },
                        {
                          html: "Africa on a plate",
                          href: "../individuals/article-africa-on-plate.html",
                          image_name: "africa-food.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html:
                            "France: The most admired and all-time favourite destination",
                          href:
                            "../individuals/article-most-admired-destination.html",
                          image_name: "most-admired-destination.jpg"
                        },
                        {
                          html: "Culinary delights on Malaysian streets",
                          href:
                            "../individuals/article-delights-on-malaysian-streets.html",
                          image_name: "malaysian-streets.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "Yuletide Cheer",
                          href: "../individuals/article-yuletide-cheer.html",
                          image_name: "yuletide-cheer.jpg"
                        }
                      ]
                    },
                    {
                      data_key: "about_us",
                      html: "About us",
                      href: "../individuals/blog-about.html",
                      image_folder_name: "about",
                      hidden_child_nav: [
                        {
                          html: "A clean energy transformation in rural India",
                          href:
                            "../individuals/article-clean-energy-transformation-in-rural-India.html",
                          image_name: "clean-energy-transformation.jpg",
                          image_style: {
                            "background-position": "top"
                          },
                          show_on_section_top: true,
                          show_on_featured: true
                        },
                        {
                          html: "VFS Global recognised for quality & business excellence",
                          href:
                            "../individuals/article-vfs-global-recognised-for-quality-and-business-excellence.html",
                          image_name: "vfs-recognised-for-quality-business-excellence.jpg",

                          show_on_featured: true
                        },
                        {
                          html: "Serving citizens effectively with tech-enabled services",
                          href:
                            "../individuals/article-serving-citizen-effectively-with-tech-enabled-services.html",
                          image_name: "Serving-citizen-effectively.jpg",

                          show_on_featured: true
                        },
                        {
                          html: "The next-level in citizen services",
                          href:
                            "../individuals/article-the-next-level-in-citizen-services.html",
                          image_name: "Next-Level-in-Citizen-Services.jpg"
                        },
                        {
                          html: "Speaking with the CEO of the Akanksha Foundation",
                          href:
                            "../individuals/article-speaking-with-the-CEO-of-the-Akanksha-Foundation.html",
                          image_name: "Schools-Must-Focus.jpg"
                        },
                        {
                          html: "Transformational Citizen Services",
                          href:
                            "../individuals/article-transformational-citizen-services.html",
                          image_name: "Transformational-Citizen-Services.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "The Customer is King at VFS Global",
                          href:
                            "../individuals/article-the-customer-is-king-at-vfs-global.html",
                          image_name: "the-customer-is-king.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "Chatbot story",
                          href: "../individuals/article-chat-bot-story.html",
                          image_name: "chatbot.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "Privilege Program story",
                          href:
                            "../individuals/article-privilege-program-story.html",
                          image_name: "privilege-program.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "VFS Global already GDPR compliant",
                          href: "../individuals/article-gdpr-story.html",
                          image_name: "gdpr-story.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html: "Learn anytime, anywhere",
                          href: "../individuals/article-learn-anytime.html",
                          image_name: "learn-anytime-anywhere.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html:
                            "VFS Global’s sustainability roadmap: Creating value for people, business, society",
                          href:
                            "../individuals/article-sustainability-roadmap.html",
                          image_name: "sustainability-roadmap.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        },
                        {
                          html:
                            "VFS Global in Russia says ‘da!’ (“yes”) to the world",
                          href: "../individuals/article-russia-says-da.html",
                          image_name: "russia-says-da.jpg",
                          image_style: {
                            "background-position": "top"
                          }
                        }
                      ]
                    }
                  ]
                }
              },
              {
                html: "Privilege Program Membership",
                //if icon_class provided, icon will be shown after text
                icon_class: "icon-new-window",
                href: "https://www.vfsglobal-privilege.com/",
                target: "_blank",
                //this class will be applied to menu li
                class_name: "highlight_green"
              }
            ],
            //this navigation is shown in individuals footer above disclaimer links
            footer_main_links: [
              {
                html: "About",
                href: "../individuals/about.html"
              },
              {
                html: "Blog",
                href: "../individuals/blog-featured.html"
              },
              {
                html: "Careers",
                href: "../individuals/careers.html"
              },
              {
                html: "Media",
                href: "../individuals/media-releases.html"
              },
              {
                html: "Contact",
                href: "../individuals/contact.html"
              }
            ].concat(general_hidden_links),
            //this navigation is shown in individuals footer above copyright
            footer_extra_links: $.extend(true, [], general_extra_links),
            //this navigation is used to shown in UI instead used to display breadcrumbs and page title
            hidden_extra_links: $.extend(true, [], general_hidden_links)
          }
        },
        {
          html: "For Governments",
          href: "../governments/index.html",
          sub_nav: {
            //this navigation is shown in governments pages below the logo
            main_sub_nav: [
              {
                html: "Home",
                href: "../governments/index.html",
                title_prefix: "Welcome to VFS Global"
              },
              {
                id: "solutions", //this id will be used as key that has data about solutions that will be used in vue component; see master-service-page vue component in vue-app.js
                html: "Solutions",
                href: "../governments/solutions.html",
                images_path: "../assets/images/solutions/",
                //this link_html will be displayed in governments solution box (e.g. see Governments > Solutions page)
                link_html: "Learn more",
                //this prefix will be used for each icon_name in solutions
                icon_name_prefix: "icon-solution-",
                hidden_child_nav: $.extend(
                  true,
                  [],
                  governments.solutions_services
                )
              },
              {
                id: "news",
                html: "News",
                href: "../governments/latest-news.html",
                //give array of page links where you want to show news data in pages other than news pages (pages which doesn't come inside this object)
                show_data_in_other_pages: [
                  "../governments/index.html",
                  "../individuals/media-releases.html"
                ],
                //give page link of Individuals > Media Releases to allow generation of data for that page
                individuals_media_release_href:
                  "../individuals/media-releases.html",
                sub_nav: {
                  //this navigation is shown in governments > news sub section pages
                  inner_sub_nav: $.extend(true, [], governments.news_sections)
                }
              },
              $.extend(true, {}, governments.about),
              {
                html: "Footprint",
                href: "../general/footprint.html"
              }
            ],
            //this navigation is shown in governments > footer > solutions
            footer_main_content_many_links: [
              {
                html: "Solutions",
                href: "../governments/solutions.html",
                //it will create array of solutions_services according to order of "footer_index"
                child_nav: vfs.utilities.json_and_arr.create_sequenced_arr(
                  governments.solutions_services,
                  "footer_index"
                )
              }
            ],
            //this navigation is shown in governments > footer > news
            footer_main_content_few_links: [
              {
                html: "News",
                href: "../governments/latest-news.html",
                child_nav: $.extend(true, [], governments.news_sections)
              },
              $.extend(true, {}, governments.about)
            ],
            //this navigation is shown in governments footer above disclaimer links
            footer_main_links: [
              {
                html: "About",
                href: "../governments/about.html"
              },
              {
                html: "News",
                href: "../governments/latest-news.html"
              },
              {
                html: "Solutions",
                href: "../governments/solutions.html"
              },
              {
                html: "Media",
                href: "../governments/media-releases.html"
              },
              {
                html: "Get in touch",
                href: "../governments/get-in-touch.html",
                hidden_child_nav: [
                  {
                    html: "Regional Offices",
                    href: "../governments/regional-offices.html"
                  }
                ]
              }
            ].concat(general_hidden_links),
            //this navigation is shown in governments footer above copyright
            footer_extra_links: $.extend(true, [], general_extra_links),
            //this navigation is used to shown in UI instead used to display breadcrumbs and page title
            hidden_extra_links: $.extend(true, [], general_hidden_links)
          }
        }
      ];
    })()
  };
})(jQuery);
