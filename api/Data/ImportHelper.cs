using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using koudouApi.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace koudouApi.Data
{
    public class ImportHelper {

        private KoudouContext Context { get; set; }

        public ImportHelper(KoudouContext context){
            this.Context = context;
        }

        public void Seed(){
            this.ClearDB();
            this.ImportAddresses();
            this.ImportUsers();
            this.ImportNews();
            this.ImportNewsletterSubscribers();
            this.ImportFamilies();
            this.ImportRoles();
            this.ImportMembers();
            this.ImportPayments();
            this.ImportAlbums();
            this.ImportPhotos();
            this.ImportComments();
            this.ImportSections();
            this.ImportSectionsMembers();

        }

        public int ImportAddresses(){
            JObject [] adresses = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_mb_adresses.json"));
            foreach(var adress in adresses){
                var newAdress = new Adress(
                    HttpUtility.HtmlDecode((string)adress["rue"]), 
                    HttpUtility.HtmlDecode((string)adress["numero"]), 
                    HttpUtility.HtmlDecode((string)adress["bte"]), 
                    HttpUtility.HtmlDecode((string)adress["cp"]), 
                    HttpUtility.HtmlDecode((string)adress["ville"])
                    );
                newAdress.OldId = (int)adress["numfamille"];
                Context.Adresses.Add(newAdress);
            }
            return Context.SaveChanges();
        }
        public int ImportAlbums(){
            JObject [] galeries = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_galerie.json"));
            foreach(var galerie in galeries){
                var newAlbum = new Album(
                    HttpUtility.HtmlDecode((string)galerie["titre"]),
                    HttpUtility.HtmlDecode((string)galerie["description"]),
                    DateTime.ParseExact((string)galerie["dateactivite"], "yyyy-MM-dd", null),
                    HttpUtility.HtmlDecode((string)galerie["auteurphotos"])
                    );
                newAlbum.Section = Context.Sections.FirstOrDefault(s => s.OldId == (int)galerie["galerie_section"]);
                newAlbum.Disabled = (string)galerie["statutgalerie"] == "1";
                newAlbum.OldId = (int)galerie["numgalerie"];
                newAlbum.CreationDate = DateTime.ParseExact((string)galerie["datecreation"], "yyyy-MM-dd HH:mm:ss", null);
                newAlbum.ModificationDate = newAlbum.CreationDate;
                Context.Albums.Add(newAlbum);
            }
            return Context.SaveChanges();
        }
        public int ImportNews(){
            JObject [] news = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_news.json"));
            foreach(var newsItem in news){
                var user = Context.Users.FirstOrDefault(u => u.OldId == (int)newsItem["auteur_news"]);
                var newNews = new News(
                    HttpUtility.HtmlDecode((string)newsItem["titre_news"]),
                    HttpUtility.HtmlDecode((string)newsItem["texte_news"]),
                    user
                    );
                var isBannie = HttpUtility.HtmlDecode((string)newsItem["news_bannie"]);
                newNews.Disabled = (isBannie == "1");
                newNews.CreationDate = DateTime.ParseExact((string)newsItem["datecreation"], "yyyy-MM-dd HH:mm:ss", null);
                newNews.ModificationDate = newNews.CreationDate;
                Context.News.Add(newNews);
            }
            return Context.SaveChanges(true);
        }
        public int ImportNewsletterSubscribers(){
            JObject [] subscribers = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_site_mailing_liste.json"));
            foreach(var subscriber in subscribers){
                var newSubscriber = new NewsletterSubscriber(
                    HttpUtility.HtmlDecode((string)subscriber["nom"]),
                    HttpUtility.HtmlDecode((string)subscriber["email"])
                    );
                var isEnabled = HttpUtility.HtmlDecode((string)subscriber["envoi_ok"]);
                newSubscriber.Disabled = (isEnabled != "1");
                newSubscriber.CreationDate = DateTime.ParseExact((string)subscriber["date_ajout"], "yyyy-MM-dd", null);
                newSubscriber.ModificationDate = newSubscriber.CreationDate;
                Context.NewsletterSubscribers.Add(newSubscriber);
            }
            return Context.SaveChanges(true);
        }
        public int ImportPhotos(){
            JObject [] photos = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_albums.json"));
            foreach(var photo in photos){
                var newPhoto = new Photo(
                    HttpUtility.HtmlDecode((string)photo["nomfichier"]), 
                    null
                );
                newPhoto.OldId = (int)photo["numphoto"];
                var album = Context.Albums.FirstOrDefault(a => a.OldId == (int)photo["numalbum"]);
                var albumPhoto = new AlbumPhoto();
                albumPhoto.Photo = newPhoto;
                albumPhoto.Album = album;
                albumPhoto.Order = (int)photo["posphoto"];
                if(album != null){
                    if(newPhoto.AlbumPhotos == null)
                    {
                        newPhoto.AlbumPhotos = new List<AlbumPhoto>();
                    }
                    newPhoto.AlbumPhotos.Add(albumPhoto);
                }
                Context.Photos.Add(newPhoto);
            }
            return Context.SaveChanges();
        }
        public int ImportComments(){
            JObject [] comments = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_commentaires.json"));
            foreach(var comment in comments){
                var user = Context.Users.FirstOrDefault(u => u.OldId == (int)comment["auteur"]);
                var albumPhoto = Context.AlbumPhotos.FirstOrDefault(a => a.Album.OldId == (int)comment["album"] && a.Order == (int)comment["photo"]);
                var newComment = new Comment(
                    HttpUtility.HtmlDecode((string)comment["commentaire"]),
                    null,
                    user
                );
                if(albumPhoto != null){
                    newComment.PhotoId = albumPhoto.PhotoId;
                }
                newComment.CreationDate = ((string)comment["datecreation"] == null)? DateTime.Now : DateTime.ParseExact((string)comment["datecreation"], "yyyy-MM-dd HH:mm:ss", null);
                newComment.ModificationDate = newComment.CreationDate;
                newComment.Disabled = (string)comment["commentairebanni"] == "0"? false : true;
                Context.Comments.Add(newComment);
            }
            return Context.SaveChanges(true);
        }
        public int ImportFamilies(){
            JObject [] addresses = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_mb_adresses.json"));
            foreach(var adress in addresses){
                var adressEntity = Context.Adresses.FirstOrDefault(a => a.OldId == (int)adress["numfamille"]);
                var newFamily = new Family(
                    HttpUtility.HtmlDecode((string)adress["nom"])
                    );
                newFamily.Adress = adressEntity;
                newFamily.CreationDate = ((string)adress["ad_datecreation"] == null)? DateTime.Now : DateTime.ParseExact((string)adress["ad_datecreation"], "yyyy-MM-dd HH:mm:ss", null);
                newFamily.ModificationDate = newFamily.CreationDate;
                Context.Families.Add(newFamily);
                var i = 1;
                string phoneNum = (string)adress["tel" + i];
                do{
                    var phone = new Phone(
                        phoneNum,
                        PhoneType.Unknow
                    );
                    phone.Family = newFamily;
                    Context.Phones.Add(phone);

                    i++;
                    phoneNum = (string)adress["tel" + i];
                }
                while(!string.IsNullOrEmpty(phoneNum));
            }
            return Context.SaveChanges(true);
        }
        public int ImportPayments(){
            JObject [] members = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_mb_membres.json"));

            var newPayment = new Payment(
                        "Cotisation 2020",
                        PaymentType.Cotisation,
                        50,
                        new DateTime(2020, 12, 31, 0, 0, 0, DateTimeKind.Local)
                        );
            Context.Payments.Add(newPayment);

            foreach (var member in members)
            {
                var cotisation = HttpUtility.HtmlDecode((string)member["cotisation"]);
                var memberEntity = Context.Members.FirstOrDefault(m => m.OldId == (int)member["nummb"]);
                var newPaymentMember = new PaymentMember(
                        (cotisation == "0") ? false : true,
                        memberEntity,
                        newPayment
                        );
                Context.PaymentMembers.Add(newPaymentMember);
            }
            return Context.SaveChanges();
        }
        public int ImportMembers(){
            JObject [] members = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_mb_membres.json"));
            foreach(var member in members){
                var newPhoto = new Photo(
                    HttpUtility.HtmlDecode((string)member["photo"]), 
                    null
                    );
                Context.Photos.Add(newPhoto);

                var personEntity = new Person(
                    HttpUtility.HtmlDecode((string)member["nom_mb"]),
                    HttpUtility.HtmlDecode((string)member["prenom"]),
                    HttpUtility.HtmlDecode((string)member["email_mb"]),
                    (string)member["ddn"],
                    char.ToUpper((char)member["sexe"]),
                    HttpUtility.HtmlDecode((string)member["telperso"]),
                    HttpUtility.HtmlDecode((string)member["rmq_mb"])
                );
                var phone = new Phone(
                    (string)member["telperso"],
                    PhoneType.Personal
                );
                phone.Person = personEntity;
                Context.Phones.Add(phone);
                var familyId1 = (int)member["famille"];
                var familyId2 = (int)member["famille2"];
                personEntity.Family = Context.Families.FirstOrDefault(f => f.OldId == familyId1);
                personEntity.Family2 = Context.Families.FirstOrDefault(f => f.OldId == familyId2);
                personEntity.CreationDate = DateTime.ParseExact((string)member["dateinscr"], "yyyy-MM-dd", null);
                personEntity.ModificationDate = DateTime.ParseExact((string)member["mb_lastmodif"], "yyyy-MM-dd HH:mm:ss", null);
                personEntity.Disabled = ((int)member["actif"] == 1)? true : false;
                personEntity.Photo = newPhoto;

                var memberEntity = new Member(
                    HttpUtility.HtmlDecode((string)member["totem"]),
                    HttpUtility.HtmlDecode((string)member["totem_jungle"]),
                    HttpUtility.HtmlDecode((string)member["quali"])
                );
                memberEntity.Person = personEntity;
                memberEntity.OldId = (int) member["nummb"];
                Context.Members.Add(memberEntity);

                var role = Context.Roles.FirstOrDefault(r => r.OldId == (int)member["fonction"]);
                var newPersonRole = new PersonRole();
                newPersonRole.Person = personEntity;
                newPersonRole.Role = role;
                Context.PersonRoles.Add(newPersonRole);
            }
            return Context.SaveChanges();
        }
        public int ImportUsers(){
            JObject [] authors = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_auteurs.json"));
            foreach(var author in authors){
                var pseudo = HttpUtility.HtmlDecode((string)author["pseudo"]);
                if(!String.IsNullOrEmpty(pseudo)){
                    var newUser = new User(
                        pseudo, 
                        HttpUtility.HtmlDecode((string)author["pw"]),
                        ((string)author["conditions_acceptees"] == "0")
                    );
                    newUser.OldId = (int)author["num"];
                    newUser.Disabled = ((string)author["banni"] == "1");
                    newUser.CreationDate = ((string)author["dateinscr"] == null)? DateTime.Now : DateTime.ParseExact((string)author["dateinscr"], "yyyy-MM-dd HH:mm:ss", null);
                    newUser.ModificationDate = newUser.CreationDate;
                    Context.Users.Add(newUser);
                }
            }
            return Context.SaveChangesWithoutAudits();
        }
        public int ImportRoles(){
            JObject [] roles = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_unite_fonctions.json"));
            foreach(var role in roles){
                var newRole = new Role(
                    HttpUtility.HtmlDecode((string)role["nomfonction"])
                );
                newRole.OldId = (int)role["numfonction"];
                Context.Roles.Add(newRole);
            }
            var cpRole = new Role("CP");
            Context.Roles.Add(cpRole);
            return Context.SaveChanges();
        }
        public int ImportSectionsMembers(){
            JObject [] members = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_mb_membres.json"));
            foreach(var member in members){
                var section = Context.Sections.FirstOrDefault(s => s.OldId == (int)member["section"]);
                var memberEntity = Context.Members.FirstOrDefault(m => m.OldId == (int)member["nummb"]);
                var newSectionMember = new SectionMember();
                newSectionMember.Section = section;
                newSectionMember.Member = memberEntity;
                Context.SectionMembers.Add(newSectionMember);

                var sizaineOldId = (int)member["siz_pat"];
                if(sizaineOldId != 0){
                    var newSectionMemberForSizaine = new SectionMember();
                    newSectionMemberForSizaine.Member = memberEntity;
                    newSectionMemberForSizaine.Section = Context.Sections.FirstOrDefault(s => s.OldId == sizaineOldId);
                    if((string)member["cp_sizenier"] == "1"){
                        newSectionMemberForSizaine.Role = Context.Roles.FirstOrDefault(r => r.Name == "CP");
                    }
                    Context.SectionMembers.Add(newSectionMemberForSizaine);
                }

            }
            return Context.SaveChanges();
        }
        public int ImportSections(){
            JObject [] sections = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_unite_sections.json"));
            foreach(var section in sections){
                var sex = (string)section["sexe"];
                var newSection = new Section(
                    HttpUtility.HtmlDecode((string)section["nomsection"]),
                    null,
                    sex == "f" ? 'F' : sex == "m" ? 'M' : 'O',
                    HttpUtility.HtmlDecode((string)section["trancheage"]),
                    (int)section["position_section"]
                );
                newSection.OldId = (int)section["numsection"];
                Context.Sections.Add(newSection);
            }

            Context.SaveChanges();

            JObject [] sizaines = JsonConvert.DeserializeObject<JObject[]>(File.ReadAllText(@"./Data/imports/swp_unite_sizaines.json"));
            foreach(var section in sizaines){
                var newSection = new Section(
                    HttpUtility.HtmlDecode((string)section["nomsizaine"]),
                    HttpUtility.HtmlDecode((string)section["cri"]),
                    'O',
                    null,
                    0
                );
                newSection.OldId = (int)section["numsizaine"];
                int parentSectionId = (int)section["section_sizpat"];
                newSection.ParentSection = Context.Sections.FirstOrDefault(s => s.OldId == parentSectionId);
                newSection.Sex = newSection.ParentSection.Sex;
                Context.Sections.Add(newSection);
            }

            return Context.SaveChanges();
        }
        public int ClearDB(){
            Context.Database.ExecuteSqlRaw(
            @"
                TRUNCATE TABLE 
                    public.""Activitys"",
                    public.""Adresses"",
                    public.""Albums"",
                    public.""AlbumPhotos"",
                    public.""Claims"",
                    public.""ClaimRoles"",
                    public.""Comments"",
                    public.""Families"",
                    public.""Members"",
                    public.""News"",
                    public.""NewsletterSubscribers"",
                    public.""Payments"",
                    public.""PaymentMembers"",
                    public.""Persons"",
                    public.""PersonRoles"",
                    public.""Phones"",
                    public.""Photos"",
                    public.""Roles"",
                    public.""Sections"",
                    public.""SectionMembers"",
                    public.""Users""
                    RESTART IDENTITY;"
                );
            return Context.SaveChanges(true);
        }
    }
}
